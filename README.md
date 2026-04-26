# Task Manager – Sui Move Smart Contract

A simple on-chain **task management application** built using **Move on the Sui blockchain**.  
This project demonstrates core Sui concepts such as **object ownership, permissions, and on-chain state management**.


#  Project Name
task_manager

#  Module
Move / Sui Core  / walrus

#  Deployment Type
Testnet  

# What was built

This project implements a decentralized task management system where users can:

- Create tasks directly on-chain
- Store task data permanently on Sui
- Track completion status of tasks
- Ensure only the task owner can update their task

Each task is represented as an **on-chain object** owned by its creator.

this projet is still in it's beta testing phase

the walrus.jsx applies the walrus integration from ./lib/walrus.js which imports the walrus client and introduce walrus methods such as UploadTowalrus that returns the bolbId and getFromwalrus that returns the uploaded walrus objects but the blobId or userAccount (wallet) that deployed to walrus



#  How Sui Core is used

This project leverages core Sui blockchain features:

###  Object Model
Tasks are stored as **Sui objects** on-chain.

###  Ownership
Each task is assigned to the transaction sender at creation.

###  Permissions
Only the owner of a task is allowed to modify its state.

###  On-chain State
All task creation and updates are permanently recorded on-chain.

#  Smart Contract Location

The Move module is located in the project repository under:
sources/task_manager.move


It has been compiled and deployed as part of the published Sui package on testnet.


#  Deployment Proof

##  Package ID (Contract Address)

0x80107ad031a3d1715b653cf7dc510e990bac3686ba27c657a2aaf468941508d9



##  Explorer Link

https://suiexplorer.com/object/0x80107ad031a3d1715b653cf7dc510e990bac3686ba27c657a2aaf468941508d9



##  Deployment Transaction

E599L4h3EucX7B7GW4mHG35YxfD43A4c4xMSGJnEwa6P

https://suiexplorer.com/txblock/E599L4h3EucX7B7GW4mHG35YxfD43A4c4xMSGJnEwa6P



#  Expected Usage / Impact

This startup project demonstrates a foundational basic pattern for:

- On-chain task tracking systems
- Decentralized productivity applications
- Ownership-based workflow systems
- Future dApps with collaboration features


#  Status

Completed  

#  Key Learnings

For first-time use and exploration of the Sui ecosystem, these are the main learning outcomes:

- Sui project architecture and initialisation steps
- Sui object model and ownership rules
- Move module structure
- On-chain state design
- Deployment to Sui testnet
- Transaction and package verification
- use case of walrus storage

# future outcomes

Full integration of SUI and Walrus dependencies that uploads to SUI directly after a successful Walrus upload. And full working application logic.



## Third-Party Tools & Disclaimer

This project may interact with or reference third-party tools and services, these tools are used strictly for development and educational purposes.

Repo Link : https://github.com/rocker-bell/sui-move-integration-01

#  Notes

- Each task exists as an independent on-chain object
- Only the owner can update task status
- Fully deployed and verifiable on Sui testnet

© 2026 rocker_bell. All rights reserved.

This project and its source code are proprietary. 

**Only the owner** (rocker_bell) or **explicitly designated parties** may use, copy, modify, merge, publish, distribute, sublicense, or sell any part of this project.

Any unauthorized use, reproduction, modification, or distribution by others is strictly prohibited.

##  Note

> This project and repository are **actively maintained** and **regularly updated**.