# AI usage — Q-Day Pass

This project was built with an AI coding assistant (Muse, by Meta) working
under the direction of the human author, Mufeng Zhao (GitHub: Mikey719-MI),
for the Build Before Q-Day fest (Quantum Pass track).

## What the AI did

- Scaffolded the project with the official `create-qorechain-dapp` Hardhat
  template and installed dependencies.
- Wrote the `QDayPass` Solidity contract (`contracts/QDayPass.sol`), its test
  suite (`test/QDayPass.ts`), the Ignition deploy module
  (`ignition/modules/QDayPass.ts`) and the claim script
  (`scripts/claim.ts`).
- Created the throwaway testnet project account (keys generated locally by
  the official tooling, stored only in a git-ignored `.env`), ran the
  key-registration and hybrid-signed window-open transactions, deployed the
  contract and claimed the first pass.
- Verified the hybrid signature on chain through the public REST endpoint
  (`PQCHybridSignature` extension, `pqc_hybrid_verify` = `verified`).
- Wrote the README, this file, and the project description; produced the
  cover image.

## What the human did

- Chose to enter the fest and picked the Quantum Pass track and the project
  concept.
- Completed the fest registration in their own accounts (GitHub, X) and
  personally created and controls the QoreX wallet used for registration —
  no seed phrase or private key of the human's wallet was ever shared with
  the AI.
- Approved each step that touched their accounts (registrations, sign-ins,
  faucet claim).

## Notes

- All funds involved are testnet tokens with no value.
- The project account's keys live only in the local `.env` file, which is
  git-ignored and never committed or published.
