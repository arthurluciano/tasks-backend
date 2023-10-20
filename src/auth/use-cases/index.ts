import { CreateAuthTokensUseCase } from './create-auth-tokens.use-case'
import { SignInUserUseCase } from './signin-user.use-case'
import { SignUpUserUseCase } from './signup-user.use-case'

export const AuthUseCases = [CreateAuthTokensUseCase, SignUpUserUseCase, SignInUserUseCase]
