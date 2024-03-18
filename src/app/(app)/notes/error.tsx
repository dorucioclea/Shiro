/* eslint-disable react/display-name */
'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'

import { NotFound404 } from '~/components/common/404'
import { NotePasswordForm } from '~/components/modules/note/NotePasswordForm'
import { StyledButton } from '~/components/ui/button'
import { isClientSide } from '~/lib/env'
import { isRequestError, pickStatusCode } from '~/lib/is-error'
import { setCurrentNoteNid } from '~/providers/note/CurrentNoteIdProvider'

import { Paper } from '../../../components/layout/container/Paper'

// TODO Catch if 404 or 403
export default ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    if (!isRequestError(error)) {
      // captureException(error)
    }
  }, [error])

  if (isRequestError(error)) {
    const code = pickStatusCode(error)

    if (!code) {
      return null
    }
    if (code === 403) {
      return (
        <Paper>
          <NotePasswordForm />
          <NoteSetCurrnetId />
        </Paper>
      )
    }

    if (code === 404 || code === 422) {
      return (
        <Paper className="flex flex-col items-center">
          <NotFound404 />
        </Paper>
      )
    }
    return (
      <Paper>
        <h1 className="mt-20 text-center text-3xl font-medium">{code}</h1>
      </Paper>
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
    <Paper>
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
    </Paper>
  )
}

const NoteSetCurrnetId = () => {
  const { id } = useParams()
  useEffect(() => {
    setCurrentNoteNid(id as string)
  }, [id])
  return null
}
