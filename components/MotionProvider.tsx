'use client'

import { MotionConfig } from 'framer-motion'

export function MotionProvider({ children, nonce }: { children: React.ReactNode; nonce: string }) {
  return <MotionConfig nonce={nonce}>{children}</MotionConfig>
}
