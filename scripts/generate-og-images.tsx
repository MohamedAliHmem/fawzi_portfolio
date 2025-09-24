import { ImageResponse } from '@vercel/og'
import { join } from 'path'
import { writeFile, mkdir } from 'fs/promises'
import { baseURL, person } from '@/resources'

async function loadGoogleFont(font: string): Promise<ArrayBuffer> {
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

async function generateImage(title: string): Promise<ArrayBuffer> {
  const fontData = await loadGoogleFont('Geist:wght@400')

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          padding: "6rem",
          background: "#151515",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "4rem",
            fontStyle: "normal",
            color: "white",
          }}
        >
          <span
            style={{
              padding: "1rem",
              fontSize: "6rem",
              lineHeight: "8rem",
              letterSpacing: "-0.05em",
              whiteSpace: "wrap",
              textWrap: "balance",
              overflow: "hidden"
            }}
          >
            {title}
          </span>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "5rem",
            }}
          >
            <img
              src={`${baseURL}${person.avatar}`}
              style={{
                width: "12rem",
                height: "12rem",
                objectFit: "cover",
                borderRadius: "100%",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  fontSize: "4.5rem",
                  lineHeight: "4.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                }}
              >
                {person.name}
              </span>
              <span
                style={{
                  fontSize: "2.5rem",
                  lineHeight: "2.5rem",
                  whiteSpace: "pre-wrap",
                  textWrap: "balance",
                  opacity: "0.6",
                }}
              >
                {person.role}
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 720,
      fonts: [
        {
          name: 'Geist',
          data: fontData,
          style: 'normal',
        },
      ],
    }
  ).arrayBuffer()
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