import { ImageResponse } from '@vercel/og'
import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const person = require('../src/resources/content.js').person

async function loadGoogleFont(font) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${font}`)).text()
  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)

  if (resource) {
    const response = await fetch(resource[1])
    if (response.status == 200) {
      return await response.arrayBuffer()
    }
  }

  throw new Error('failed to load font data')
}

async function generateImage(title) {
  const fontData = await loadGoogleFont('Geist:wght@400')

  const element = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: '6rem',
        background: '#151515',
      },
      children: {
        type: 'div',
        props: {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '4rem',
            fontStyle: 'normal',
            color: 'white',
          },
          children: [
            {
              type: 'span',
              props: {
                style: {
                  padding: '1rem',
                  fontSize: '6rem',
                  lineHeight: '8rem',
                  letterSpacing: '-0.05em',
                  whiteSpace: 'wrap',
                  textWrap: 'balance',
                  overflow: 'hidden',
                },
                children: title,
              },
            },
            {
              type: 'div',
              props: {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5rem',
                },
                children: [
                  {
                    type: 'img',
                    props: {
                      src: person.avatar,
                      style: {
                        width: '12rem',
                        height: '12rem',
                        objectFit: 'cover',
                        borderRadius: '100%',
                      },
                    },
                  },
                  {
                    type: 'div',
                    props: {
                      style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.75rem',
                      },
                      children: [
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontSize: '4.5rem',
                              lineHeight: '4.5rem',
                              whiteSpace: 'pre-wrap',
                              textWrap: 'balance',
                            },
                            children: person.name,
                          },
                        },
                        {
                          type: 'span',
                          props: {
                            style: {
                              fontSize: '2.5rem',
                              lineHeight: '2.5rem',
                              whiteSpace: 'pre-wrap',
                              textWrap: 'balance',
                              opacity: '0.6',
                            },
                            children: person.role,
                          },
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
    },
  }

  const imageResponse = new ImageResponse(element, {
    width: 1280,
    height: 720,
    fonts: [
      {
        name: 'Geist',
        data: fontData,
        style: 'normal',
      },
    ],
  })

  return await imageResponse.arrayBuffer()
}

async function generateOGImages() {
  const ogDir = join(process.cwd(), 'public', 'images', 'og')
  
  // Make sure the directory exists
  await mkdir(ogDir, { recursive: true })

  // Generate default OG image
  const defaultImage = await generateImage('Portfolio')
  await writeFile(join(ogDir, 'default.png'), Buffer.from(defaultImage))

  // Add more images here if needed
  // For example, you could generate OG images for each blog post or work item
}

generateOGImages().catch(console.error)