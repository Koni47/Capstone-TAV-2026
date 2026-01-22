import React, { useEffect, useRef } from 'react'
import { NavigateFunction } from 'react-router-dom'

type Props = { html: string; navigate?: NavigateFunction }

export default function HtmlMockRenderer({ html, navigate }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (!containerRef.current) return
    // Parse HTML and inject body content
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    const bodyHtml = doc.body.innerHTML
    containerRef.current.innerHTML = bodyHtml
    // Apply body classes to the container
    containerRef.current.className = doc.body.className

    // Rewrite local links and form actions that point to .html -> route paths
    const rewritePath = (p: string | null) => {
      if (!p) return p
      if (/^https?:\/\//.test(p)) return p
      // make absolute
      const fixed = p.startsWith('/') ? p : `/${p}`
      // convert /something.html -> /something
      return fixed.replace(/\.html$/i, '')
    }

    // Rewrite anchors
    Array.from(doc.querySelectorAll('a[href]')).forEach((a) => {
      const href = a.getAttribute('href')
      if (!href) return
      const newHref = rewritePath(href)
      if (newHref) a.setAttribute('href', newHref)
    })

    // Rewrite form actions
    Array.from(doc.querySelectorAll('form[action]')).forEach((f) => {
      const action = f.getAttribute('action')
      if (!action) return
      const newAction = rewritePath(action)
      if (newAction) f.setAttribute('action', newAction)
    })

    // Rewrite image sources
    Array.from(doc.querySelectorAll('img[src]')).forEach((img) => {
      const src = img.getAttribute('src')
      if (!src) return
      const newSrc = src.startsWith('http') ? src : (src.startsWith('/') ? src : `/${src}`)
      img.setAttribute('src', newSrc)
    })

    // Inject styles from parsed head (link rel=stylesheet)
    const links = Array.from(doc.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[]
    links.forEach((l) => {
      const href = l.getAttribute('href')
      if (!href) return
      // avoid duplicates
      if (document.querySelector(`link[href="${href}"]`)) return
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = href.startsWith('http') ? href : (href.startsWith('/') ? href : `/${href}`)
      document.head.appendChild(link)
    })

    // Inject and execute scripts found in body
    const scripts = Array.from(doc.querySelectorAll('script')) as HTMLScriptElement[]
    const injected: HTMLScriptElement[] = []
    scripts.forEach((s) => {
      const src = s.getAttribute('src')
      if (src) {
        // External script
        const script = document.createElement('script')
        script.src = src.startsWith('http') ? src : (src.startsWith('/') ? src : `/${src}`)
        script.async = false
        document.body.appendChild(script)
        injected.push(script)
      } else if (s.textContent) {
        // Inline script - execute it
        try {
          // Use Function constructor to execute in global scope
          const func = new Function(s.textContent)
          func()
        } catch (error) {
          console.error('Error executing inline script:', error)
        }
      }
    })

    // Handle navigation if navigate is provided
    if (navigate) {
      function handleClick(e: Event) {
        const target = e.target as HTMLElement
        let link = target
        while (link && link.tagName !== 'A') {
          link = link.parentElement as HTMLElement
        }
        if (link && link.tagName === 'A') {
          const href = (link as HTMLAnchorElement).getAttribute('href')
          if (href && !href.startsWith('http') && !href.startsWith('mailto:') && !href.startsWith('#')) {
            e.preventDefault()
            navigate!(href)
          }
        }
      }
      if (containerRef.current) {
        containerRef.current.addEventListener('click', handleClick)
      }

      // Define global redirect function for scripts
      (window as any).__redirect = (url: string) => {
        const route = '/' + url.replace(/\.html$/, '').replace(/^\//, '')
        navigate!(route)
      }

      // Cleanup
      return () => {
        if (containerRef.current) {
          containerRef.current.removeEventListener('click', handleClick)
        }
        delete (window as any).__redirect
        // existing cleanup
        injected.forEach((s) => s.parentNode?.removeChild(s))
      }
    }

    return () => {
      // existing cleanup
      injected.forEach((s) => s.parentNode?.removeChild(s))
    }
  }, [html])

  return <div ref={containerRef} />
}
