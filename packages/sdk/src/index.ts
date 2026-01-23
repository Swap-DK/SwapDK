// This should be cleared from unnecessary imports and migrate to:
// - `sdk/toolboxes`
// - `sdk/plugins`
// - `sdk/wallets`
import { type SKConfigState, SwapKit } from "@swapdk/core";
import type { createPlugin } from "@swapdk/plugins";
import { ChainflipPlugin } from "@swapdk/plugins/chainflip";
import { EVMPlugin } from "@swapdk/plugins/evm";
import { GardenPlugin } from "@swapdk/plugins/garden";
import { NearPlugin } from "@swapdk/plugins/near";
import { RadixPlugin } from "@swapdk/plugins/radix";
import { SolanaPlugin } from "@swapdk/plugins/solana";
import { MayachainPlugin, ThorchainPlugin } from "@swapdk/plugins/thorchain";
import type { createWallet } from "@swapdk/wallets";

import { bitgetWallet } from "@swapdk/wallets/bitget";
import { coinbaseWallet } from "@swapdk/wallets/coinbase";
import { ctrlWallet } from "@swapdk/wallets/ctrl";
import { evmWallet } from "@swapdk/wallets/evm-extensions";
import { keepkeyWallet } from "@swapdk/wallets/keepkey";
import { keepkeyBexWallet } from "@swapdk/wallets/keepkey-bex";
import { keplrWallet } from "@swapdk/wallets/keplr";
import { keystoreWallet } from "@swapdk/wallets/keystore";
import { ledgerWallet } from "@swapdk/wallets/ledger";
import { walletSelectorWallet } from "@swapdk/wallets/near-wallet-selector";
import { okxWallet } from "@swapdk/wallets/okx";
import { onekeyWallet } from "@swapdk/wallets/onekey";
import { passkeysWallet } from "@swapdk/wallets/passkeys";
import { phantomWallet } from "@swapdk/wallets/phantom";
import { polkadotWallet } from "@swapdk/wallets/polkadotjs";
import { radixWallet } from "@swapdk/wallets/radix";
import { talismanWallet } from "@swapdk/wallets/talisman";
import { trezorWallet } from "@swapdk/wallets/trezor";
import { tronlinkWallet } from "@swapdk/wallets/tronlink";
import { vultisigWallet } from "@swapdk/wallets/vultisig";
import { walletconnectWallet } from "@swapdk/wallets/walletconnect";
import { xamanWallet } from "@swapdk/wallets/xaman";

export * from "@swapdk/core";
export * from "@swapdk/helpers";
export * from "@swapdk/helpers/api";
export * from "@swapdk/plugins";
export * from "@swapdk/plugins/chainflip";
export * from "@swapdk/plugins/evm";
export * from "@swapdk/plugins/near";
export * from "@swapdk/plugins/radix";
export * from "@swapdk/plugins/solana";
export * from "@swapdk/plugins/thorchain";
export * from "@swapdk/toolboxes";
export * from "@swapdk/toolboxes/cosmos";
export * from "@swapdk/toolboxes/evm";
export * from "@swapdk/toolboxes/radix";
export * from "@swapdk/toolboxes/solana";
export * from "@swapdk/toolboxes/substrate";
export * from "@swapdk/toolboxes/utxo";
export * from "@swapdk/wallets";

const exodusWallet = { ...passkeysWallet, connectExodusWallet: passkeysWallet.connectPasskeys };

export {
  bitgetWallet,
  coinbaseWallet,
  ctrlWallet,
  evmWallet,
  exodusWallet,
  keepkeyBexWallet,
  keepkeyWallet,
  keplrWallet,
  keystoreWallet,
  ledgerWallet,
  okxWallet,
  onekeyWallet,
  passkeysWallet,
  phantomWallet,
  polkadotWallet,
  radixWallet,
  talismanWallet,
  trezorWallet,
  tronlinkWallet,
  vultisigWallet,
  walletSelectorWallet,
  walletconnectWallet,
  xamanWallet,
};

export const defaultPlugins = {
  ...ChainflipPlugin,
  ...EVMPlugin,
  ...MayachainPlugin,
  ...ThorchainPlugin,
  ...RadixPlugin,
  ...SolanaPlugin,
  ...NearPlugin,
  ...GardenPlugin,
};

export const defaultWallets = {
  ...bitgetWallet,
  ...coinbaseWallet,
  ...ctrlWallet,
  ...evmWallet,
  ...exodusWallet,
  ...keepkeyBexWallet,
  ...keepkeyWallet,
  ...keplrWallet,
  ...keystoreWallet,
  ...ledgerWallet,
  ...okxWallet,
  ...onekeyWallet,
  ...phantomWallet,
  ...polkadotWallet,
  ...passkeysWallet,
  ...radixWallet,
  ...talismanWallet,
  ...trezorWallet,
  ...tronlinkWallet,
  ...vultisigWallet,
  ...walletSelectorWallet,
  ...walletconnectWallet,
  ...xamanWallet,
} as ReturnType<typeof createWallet>;

export function createSwapKit<
  Plugins extends ReturnType<typeof createPlugin>,
  Wallets extends ReturnType<typeof createWallet>,
>({ config, plugins, wallets }: { config?: SKConfigState; plugins?: Plugins; wallets?: Wallets } = {}) {
  const mergedPlugins = { ...defaultPlugins, ...plugins };
  const mergedWallets = { ...defaultWallets, ...wallets };

  return SwapKit({ config: config, plugins: mergedPlugins, wallets: mergedWallets });
}
