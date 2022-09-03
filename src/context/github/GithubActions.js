import axios from 'axios'

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  }
})

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN

//Get Search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })

  const res = await github.get(`/search/users/?${params}`)
  
  return res.data.items
}

//Get single result
export const getUser = async (login) => {
  console.log(login)
  const res = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  console.log(res)

  if (res.status === 404) {
    window.location = '/notfound'
  } else {
    const data = await res.json()

    return data
  }
}
//Get user repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: '10',
  })

  const res = await fetch(`${GITHUB_URL}/users/${login}/repos/${params}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  })

  console.log(res)

  if (res.status === 404) {
    window.location = '/notfound'
  } else {
    const data = await res.json()

    return data
  }
}
