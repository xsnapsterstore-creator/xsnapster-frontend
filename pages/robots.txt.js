const BASE_URL = 'https://www.xsnapster.store'

export async function getServerSideProps ({ res }) {
  const robots = `
User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`

  res.setHeader('Content-Type', 'text/plain')
  res.write(robots)
  res.end()

  return { props: {} }
}

export default function Robots () {
  return null
}
