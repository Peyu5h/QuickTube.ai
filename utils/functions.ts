import { YoutubeTranscript } from "youtube-transcript"

const YT_INITIAL_PLAYER_RESPONSE_RE =
  /ytInitialPlayerResponse\s*=\s*({.+?})\s*;\s*(?:var\s+(?:meta|head)|<\/script|\n)/

function compareTracks(track1, track2) {
  const langCode1 = track1.languageCode
  const langCode2 = track2.languageCode

  if (langCode1 === "en" && langCode2 !== "en") {
    return -1
  } else if (langCode1 !== "en" && langCode2 === "en") {
    return 1
  } else if (track1.kind !== "asr" && track2.kind === "asr") {
    return -1
  } else if (track1.kind === "asr" && track2.kind !== "asr") {
    return 1
  }

  return 0
}

export async function getVideoData(id: string) {
  try {
    // @ts-ignore
    let player = window.ytInitialPlayerResponse
    if (!player || id !== player.videoDetails.videoId) {
      const pageData = await fetch(`https://www.youtube.com/watch?v=${id}`)
      const body = await pageData.text()
      const playerResponseMatch = body.match(YT_INITIAL_PLAYER_RESPONSE_RE)

      if (!playerResponseMatch) {
        console.warn("Unable to parse playerResponse")
        return null
      }
      player = JSON.parse(playerResponseMatch[1])
    }

    const metadata = {
      title: player.videoDetails.title,
      duration: player.videoDetails.lengthSeconds,
      author: player.videoDetails.author,
      views: player.videoDetails.viewCount
    }

    try {
      const ts = await YoutubeTranscript.fetchTranscript(id)
      const transcript = {
        events: ts.map((t) => ({
          tStartMs: t.offset,
          dDurationMs: t.duration,
          segs: [{ utf8: t.text + " ", tOffsetMs: 0 }]
        }))
      }
      return { metadata, transcript }
    } catch(err) {
      console.warn("Could not fetch transcript", err)
      return { metadata, transcript: null }
    }
  } catch (error) {
    console.error("Error fetching video data:", error)
    return null
  }
}

// to handle transcript data
export function cleanJsonTranscipt(transcript) {
  if (!transcript || !transcript.events || transcript.events.length === 0) {
    return []
  }

  const chunks = []

  let currentChunk = ""
  let currentStartTime = transcript.events[0].tStartMs
  let currentEndTime = currentStartTime

  transcript.events.forEach((event) => {
    event.segs?.forEach((seg) => {
      const segmentText = seg.utf8.replace(/\n/g, " ")
      currentEndTime = event.tStartMs + (seg.tOffsetMs || 0)
      if ((currentChunk + segmentText).length > 300) {
        chunks.push({
          text: currentChunk.trim(),
          startTime: currentStartTime,
          endTime: currentEndTime
        })
        currentChunk = segmentText
        currentStartTime = currentEndTime
      } else {
        currentChunk += segmentText
      }
    })
  })

  if (currentChunk) {
    chunks.push({
      text: currentChunk.trim(),
      startTime: currentStartTime,
      endTime: currentEndTime
    })
  }

  return chunks
}

export function cleanTextTranscript(transcript) {
  if (!transcript || !transcript.events) {
    return ""
  }

  let textLines = []
  let tempText = ""
  let lastTime = 0

  transcript.events.forEach((event) => {
    if (event.segs) {
      event.segs.forEach((seg) => {
        const segmentStartTimeMs = event.startMs + (seg.tOffsetMs || 0)

        if (
          tempText &&
          (segmentStartTimeMs - lastTime > 1000 || seg.utf8 === "\n")
        ) {
          const timeFormatted = new Date(lastTime).toISOString().substr(11, 12)
          textLines.push(`${timeFormatted}: ${tempText.trim()}`)
          tempText = ""
        }

        lastTime = segmentStartTimeMs
        tempText += seg.utf8
      })
    }
  })

  if (tempText) {
    const timeFormatted = new Date(lastTime).toISOString().substr(11, 12)
    textLines.push(`${timeFormatted}: ${tempText.trim()}`)
  }

  return textLines.join("\n")
}
