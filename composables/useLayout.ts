// import type { BadgeColor } from '#ui/types'
type BadgeColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error'; // Replace with actual BadgeColor type if available

export const useLayout = () => {
  const appName = useState<string | undefined>('layout-page-title', () => undefined)
  const clientName = useState<string | undefined>('layout-client-name', () => undefined)
  const clientLogo = useState<string | undefined>('layout-client-logo', () => undefined)
  const appCode = useState<string | undefined>('layout-app-code', () => undefined)
  const appCodeColor = useState<BadgeColor | undefined>('layout-app-code-color', () => 'primary') // or undefined
  // const navLinks = useState<any[]>('layout-nav-links', () => [])

  return { appName, clientName, clientLogo, appCode, appCodeColor }
}
