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
  // @ts-ignore
  let player = window.ytInitialPlayerResponse
  if (!player || id !== player.videoDetails.videoId) {
    const pageData = await fetch(`https://www.youtube.com/watch?v=${id}`)
    const body = await pageData.text()
    const playerResponseMatch = body.match(YT_INITIAL_PLAYER_RESPONSE_RE)
    if (!playerResponseMatch) {
      console.warn("Unable to parse playerResponse")
      return
    }
    player = JSON.parse(playerResponseMatch[1])
  }

  const metadata = {
    title: player.videoDetails.title,
    duration: player.videoDetails.lengthSeconds,
    author: player.videoDetails.author,
    views: player.videoDetails.viewCount
  }

  if (player.captions && player.captions.playerCaptionsTracklistRenderer) {
    const tracks = player.captions.playerCaptionsTracklistRenderer.captionTracks
    if (tracks && tracks.length > 0) {
      tracks.sort(compareTracks)
      const transcriptResponse = await fetch(tracks[0].baseUrl + "&fmt=json3")
      const transcript = await transcriptResponse.json()
      return { metadata, transcript }
    }
  }

  return { metadata, transcript: null }
}
