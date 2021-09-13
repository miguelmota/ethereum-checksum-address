const keccak = require('keccak')

function toChecksumAddress (address, chainId = null) {
  if (typeof address !== 'string') {
    return ''
  }

  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    throw new Error(
      `Given address "${address}" is not a valid Ethereum address.`
    )
  }

  const stripAddress = stripHexPrefix(address).toLowerCase()
  const prefix = chainId != null ? chainId.toString() + '0x' : ''
  const keccakHash = keccak('keccak256')
    .update(prefix + stripAddress)
    .digest('hex')
  let checksumAddress = '0x'

  for (let i = 0; i < stripAddress.length; i++) {
    checksumAddress +=
      parseInt(keccakHash[i], 16) >= 8
        ? stripAddress[i].toUpperCase()
        : stripAddress[i]
  }

  return checksumAddress
}

function checkAddressChecksum (address, chainId = null) {
  const stripAddress = stripHexPrefix(address).toLowerCase()
  const prefix = chainId != null ? chainId.toString() + '0x' : ''
  const keccakHash = keccak('keccak256')
    .update(prefix + stripAddress)
    .digest('hex')

  for (let i = 0; i < stripAddress.length; i++) {
    let output =
      parseInt(keccakHash[i], 16) >= 8
        ? stripAddress[i].toUpperCase()
        : stripAddress[i]
    if (stripHexPrefix(address)[i] !== output) {
      return false
    }
  }
  return true
}

function stripHexPrefix (value) {
  return value.slice(0, 2) === '0x' ? value.slice(2) : value
}

module.exports = {
  toChecksumAddress,
  checkAddressChecksum
}
