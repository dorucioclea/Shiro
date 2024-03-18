'use client'

import { useEffect } from 'react'

import { NotFound404 } from '~/components/common/404'
import { NormalContainer } from '~/components/layout/container/Normal'
import { StyledButton } from '~/components/ui/button'
import { isClientSide } from '~/lib/env'
import { isRequestError, pickStatusCode } from '~/lib/is-error'

// eslint-disable-next-line react/display-name
export default ({ error }: any) => {
  useEffect(() => {
    console.error('error', error)
  }, [error])

  if (isRequestError(error) && pickStatusCode(error) === 404) {
    return (
      <div className="flex min-h-[calc(100vh-10rem)] flex-col center">
        <NotFound404 />
      </div>
    )
  }

  const originUrl = isClientSide
    ? (() => {
        const url = new URL(location.href)
        url.hostname = 'cn.innei.ren'
        return url.toString()
      })()
    : ''

  return (
    <NormalContainer>
      <div className="flex min-h-[calc(100vh-10rem)] flex-col center">
        <h2 className="mb-5">
          <p>
            服务端渲染页面时出现了错误，可能是 Next.js 服务访问 API
            超时。请刷新重试。
          </p>
          <p>
            多次出现错误请联系开发者 <a href="mailto:i@innei.in">Innei</a>
            ，谢谢！
          </p>

          <p>
            你可以尝试访问国内源站：
            <a href={originUrl}>cn.innei.ren</a>
          </p>
        </h2>
        <div className="flex gap-4">
          <StyledButton
            variant="primary"
            onClick={() => {
              location.href = originUrl
            }}
          >
            前往国内源站
          </StyledButton>
          <StyledButton variant="secondary" onClick={() => location.reload()}>
            刷新
          </StyledButton>
        </div>
      </div>
    </NormalContainer>
  )
}
