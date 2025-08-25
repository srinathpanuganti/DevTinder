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
- POST /request/send/:status/:userId //:status - interested/ignored
- POST /request/review/:status/requestId //:status - interested/ignored

## userRouter
- GET user/requests/received
- GET user/connections
- GET /feed - Gets the profiles of other users of the platform

