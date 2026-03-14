let $DefaultArtifactVersion = Java.loadClass('org.apache.maven.artifact.versioning.DefaultArtifactVersion')
let $Locale = Java.loadClass('java.util.Locale')
let modPackId = '925200' // could get from BCC but :shrug:

function resolveCurrentPackVersion() {
  // Prefer BCC-provided pack status when available.
  if (Platform.isLoaded('bcc') && Platform.isClientEnvironment()) {
    try {
      let $BccInstance = Java.loadClass('dev.wuffs.bcc.BetterCompatibilityChecker')
      // API changed at least once; guard each access.
      if ($BccInstance != null && $BccInstance.betterStatus != null && $BccInstance.betterStatus.version != null) {
        return String($BccInstance.betterStatus.version())
      }
    } catch (err) {
      console.log('[ATM Update Checker] BCC status API unavailable: ' + err)
    }
  }

  // Fallback keeps the script non-fatal if BCC internals change.
  return null
}

StartupEvents.postInit(event => {
  if (!Platform.isClientEnvironment()) return

  let currentVersionStr = resolveCurrentPackVersion()
  if (currentVersionStr == null) {
    console.log('[ATM Update Checker] Skipping check: unable to read current pack version from BCC.')
    return
  }

  let currentVersion = new $DefaultArtifactVersion(currentVersionStr)
  KJSTweaks.curseForgeGetEndpoint('v1/mods/' + modPackId + '/files?pageSize=1', Client, response => {
    let displayName = response.get('data').get(0).get('displayName').getAsString()
    let cfLatestVersionStr = displayName.toLowerCase($Locale.ROOT).replace('all the mods 10-', '').replace('.zip', '')
    let cfLatestVersion = new $DefaultArtifactVersion(cfLatestVersionStr)
    console.log('Pack Version is: ' + currentVersion)
    console.log('CF Version is: ' + cfLatestVersion)
    if (cfLatestVersion.compareTo(currentVersion) > 0) {
      let $SystemToast = Java.loadClass('net.minecraft.client.gui.components.toasts.SystemToast')
      let $SystemToastId = Java.loadClass('net.minecraft.client.gui.components.toasts.SystemToast$SystemToastId')
      $SystemToast.add(Client.getToasts(), new $SystemToastId(10000), 'New update is available!', Text.of('Version ').append(Text.green(cfLatestVersion)).append(' is already available!'))
    } else {
      console.log('Pack is up to date!')
    }
  })
})
