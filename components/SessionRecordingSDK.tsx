"use client"

import { useEffect } from 'react'
import Script from 'next/script'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const window: Window & { rrweb?: unknown; __rrweb?: unknown; SessionSDK?: { init: (key: string, opts: Record<string, unknown>) => void } }

export function SessionRecordingSDK() {
  useEffect(() => {
    console.log('[TEST APP] Component mounted')

    // Check if rrweb is already loaded (from beforeInteractive script)
    const rrwebGlobal = window.rrweb
    if (rrwebGlobal) {
      console.log('[TEST APP] rrweb already loaded, setting __rrweb')
      window.__rrweb = rrwebGlobal
      console.log('[TEST APP] __rrweb.record type:', typeof window.__rrweb)
    } else {
      console.log('[TEST APP] rrweb not yet loaded')
    }
  }, [])

  const initializeSDK = () => {
    console.log('[TEST APP] SessionSDK script loaded')

    // First ensure __rrweb is set
    const rrwebGlobal = window.rrweb
    if (rrwebGlobal && !window.__rrweb) {
      window.__rrweb = rrwebGlobal
      console.log('[TEST APP] Set __rrweb from SDK onLoad')
    }

    // Wait a moment for IIFE to execute
    setTimeout(() => {
      const sdk = window.SessionSDK
      if (sdk) {
        sdk.init('pk_test_cm189whkt5p', {
          apiHost: 'http://localhost:3000',
          debug: true,
          batchIntervalMs: 3000,
          maskAllInputs: false,
        })
        console.log('[TEST APP] SessionSDK initialized')
      } else {
        console.error('[TEST APP] SessionSDK not on window after 500ms')
      }
    }, 500)
  }

  return (
    <>
      {/* Load rrweb first */}
      <Script
        src="/rrweb.min.js"
        strategy="afterInteractive"
      />
      {/* Inline script to set __rrweb after rrweb loads */}
      <Script
        id="rrweb-setup"
        strategy="afterInteractive"
      >
        {`
          if (typeof window.rrweb !== 'undefined') {
            window.__rrweb = window.rrweb;
            console.log('[TEST APP] __rrweb set via inline script');
          }
        `}
      </Script>
      <Script
        src="http://localhost:8080/session-sdk.js"
        strategy="afterInteractive"
        onLoad={initializeSDK}
        onError={(e) => {
          console.error('[TEST APP] SessionSDK script failed to load:', e)
        }}
      />
    </>
  )
}
