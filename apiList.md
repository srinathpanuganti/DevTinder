# DEV Tinder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/requestId
- POST /request/review/rejected/requestId

## userRouter
- GET user/connectins
- GET user/requests
- GET /feed - Gets the profiles of other users of the platform

