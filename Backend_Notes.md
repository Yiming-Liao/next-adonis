### Role: User

#### Authentication Routes

**Prefix:** /api/v1/user/auth

- /api/v1/user/auth/ register
- /api/v1/user/auth/ login
- /api/v1/user/auth/ logout
- /api/v1/user/auth/ email-verify
- /api/v1/user/auth/ email-verify-resend
- /api/v1/user/auth/ password-change
- /api/v1/user/auth/ password-forgot
- /api/v1/user/auth/ password-reset

#### Directory Structure

**Base Path:** /start/api/v1/roles/user/

- **Routes Integration File:**  
  `/start/api/v1/roles/user/ routes.ts`

- **Auth Routes File:**  
  `/start/api/v1/roles/user/ user_auth_routes.ts`

- **Auth Controller File:**  
  `/app/controllers/roles/user/user_auth_controller.ts`

---

### Item: Post

#### Resource Routes

**Prefix:** /api/v1/posts

- /api/v1/posts/
- /api/v1/posts/ create
- /api/v1/posts/
- /api/v1/posts/ :id
- /api/v1/posts/
- /api/v1/posts/ :id/edit
- /api/v1/posts/ :id
- /api/v1/posts/ :id

#### Directory Structure

**Base Path:** /start/api/v1/posts/

- **Routes Integration File:**  
  `/start/api/v1/posts/ routes.ts`

---

### Access Token Options

`backend/app/models/user.ts`

```Typescript
static accessTokens = DbAccessTokensProvider.forModel(User, {
  expiresIn: '1d',
})
```
