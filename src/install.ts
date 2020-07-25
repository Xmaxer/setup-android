import * as fs from 'fs'
import * as path from 'path'
import * as core from '@actions/core'
import * as exec from '@actions/exec'
import * as tc from '@actions/tool-cache'
import {
  ANDROID_SDK_ROOT,
  COMMANDLINE_TOOLS_LIN_URL,
  COMMANDLINE_TOOLS_MAC_URL,
  COMMANDLINE_TOOLS_WIN_URL
} from './constants'

export async function install(): Promise<void> {
  const licenseDir = path.join(ANDROID_SDK_ROOT, 'licenses')

  // If the licences exist, the rest does too
  if (fs.existsSync(licenseDir)) {
    core.debug(`Skipping install, licenseDir found: ${licenseDir}`)
    return
  }

  const acceptBuffer = Buffer.from('y\ny\ny\ny\ny\n\ny', 'utf8')

  if (process.platform === 'linux') {
    const cmdlineToolsZip = await tc.downloadTool(COMMANDLINE_TOOLS_LIN_URL)
    const cmdlineTools = await tc.extractZip(cmdlineToolsZip)
    const sdkManager = path.join(cmdlineTools, 'tools', 'bin', 'sdkmanager')

    console.log(fs.readdirSync(cmdlineTools))
    console.log(fs.existsSync(sdkManager))

    exec.exec(
      sdkManager,
      ['--include_obsolete', `--sdk_root=${ANDROID_SDK_ROOT}`, 'tools'],
      {
        input: acceptBuffer
      }
    )
  } else if (process.platform === 'darwin') {
    const cmdlineToolsZip = await tc.downloadTool(COMMANDLINE_TOOLS_MAC_URL)
    const cmdlineTools = await tc.extractZip(cmdlineToolsZip)
    const sdkManager = path.join(cmdlineTools, 'tools', 'bin', 'sdkmanager')

    exec.exec(
      sdkManager,
      ['--include_obsolete', `--sdk_root=${ANDROID_SDK_ROOT}`, 'tools'],
      {
        input: acceptBuffer
      }
    )
  } else if (process.platform === 'win32') {
    const cmdlineToolsZip = await tc.downloadTool(COMMANDLINE_TOOLS_WIN_URL)
    const cmdlineTools = await tc.extractZip(cmdlineToolsZip)
    const sdkManager = path.join(cmdlineTools, 'tools', 'bin', 'sdkmanager.bat')

    exec.exec(
      sdkManager,
      ['--include_obsolete', `--sdk_root=${ANDROID_SDK_ROOT}`, 'tools'],
      {
        input: acceptBuffer
      }
    )
  } else {
    core.error(`Unsupported platform: ${process.platform}`)
  }
}