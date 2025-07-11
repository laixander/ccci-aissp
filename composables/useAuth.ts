export const useAuth = () => {
    const user = useState<{ username: string } | null>('user', () => null)
    const isLoggedIn = useState<boolean>('isLoggedIn', () => false)

    const login = (userData: { username: string }) => {
        user.value = userData
        isLoggedIn.value = true
        localStorage.setItem('user', JSON.stringify(userData))
        localStorage.setItem('isLoggedIn', 'true')
    }

    const logout = () => {
        user.value = null
        isLoggedIn.value = false
        localStorage.removeItem('user')
        localStorage.setItem('isLoggedIn', 'false')
    }

    onNuxtReady(() => {
        const storedUser = localStorage.getItem('user')
        const auth = localStorage.getItem('isLoggedIn') === 'true'
        if (storedUser && auth) {
            user.value = JSON.parse(storedUser)
            isLoggedIn.value = true
        }
    })

    return { user, isLoggedIn, login, logout }
}
