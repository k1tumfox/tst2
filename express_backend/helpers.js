export const generateId = () => Math.floor(Math.random() * 1000)

export function authenticateUser(db, email, password) {
  // {error:..., user:....}
  // Match email, then match password
  for (const user of db) {
    if (user.email === email) {
      if (user.password === password) {
        return { error: null, user }
      } else {
        return { error: 'password', user: null }
      }
    }
  }
  return { error: 'email', user: null }
}

export const fetchUser = (db, email) => {
  for (const user of db) {
    if (user.email === email) {
      return { error: null, user }
    }
  }
  return { error: 'email', user: null }
}