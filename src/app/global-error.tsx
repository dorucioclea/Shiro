'use client'

import { useEffect } from 'react'
import { domAnimation, LazyMotion } from 'framer-motion'

// import { captureException } from '@sentry/nextjs'

import { NormalContainer } from '~/components/layout/container/Normal'
import { StyledButton } from '~/components/ui/button'
import { isClientSide } from '~/lib/env'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    // captureException(error)
  }, [error])
  const originUrl = isClientSide
    ? (() => {
        const url = new URL(location.href)
        url.hostname = 'cn.innei.ren'
        return url.toString()
      })()
    : ''
  return (
    <html>
      <head>
        <title>禁止访问或者 API 服务出现问题</title>
      </head>
      <body>
        <NormalContainer>
          <h1 className="mb-4">禁止访问或者 API 服务出现问题</h1>
          <p>
            你可以尝试访问国内源站：
            <a href={originUrl}>cn.innei.ren</a>
          </p>
          <div className="flex justify-center">
            <LazyMotion features={domAnimation}>
              <StyledButton onClick={location.reload}>重试</StyledButton>
            </LazyMotion>
          </div>
        </NormalContainer>
      </body>
    </html>
  )
}
