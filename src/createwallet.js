const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')


//definir a rede
//bitcoin - rede principal - mainnet
//testnet - rede de teste - tesnet
const network =  bitcoin.networks.testnet

//atentar n1:mainnet n0:testnet
const path = `m/49'/1'/0'/0` 

//seed entropia key 64 128 256
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//criando a raiz da wallet, deterministica la red
let root = bip32.fromSeed(seed, network)
//account created pvt and pub schlussel
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Wallet created")
console.log("Address: ", btcAddress)
console.log("Private KEY:", node.toWIF())
console.log("Seed:", mnemonic)