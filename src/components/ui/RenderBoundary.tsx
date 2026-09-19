import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface RenderBoundaryProps {
  fallback: ReactNode
  onError?: (error: Error) => void
  children: ReactNode
}

/** Isole un module décoratif (WebGL, chunk différé) : son échec ne doit jamais casser la page. */
export class RenderBoundary extends Component<RenderBoundaryProps, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error: Error, _info: ErrorInfo) {
    this.props.onError?.(error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
