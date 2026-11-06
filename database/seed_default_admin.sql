-- Bootstrap Chelsea's admin account. The password is stored as a BCrypt hash.
-- ON CONFLICT avoids overwriting an existing user or replacing their password.
INSERT INTO public.users (
    username,
    email,
    password_hash,
    first_name,
    last_name,
    role,
    is_active,
    created_at,
    updated_at
)
VALUES (
    'menenangfowang@gmail.com',
    'menenangfowang@gmail.com',
    '$2a$10$2migyNWf6HMtXxMEhQQYtemTFDp8gi4CJenh4Rs5IKSpusbcjOaea',
    'Chelsea',
    '',
    'admin',
    TRUE,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
)
ON CONFLICT DO NOTHING;

SELECT id, username, email, first_name, last_name, role, is_active
FROM public.users
WHERE email = 'menenangfowang@gmail.com';

-- password: pureskinchelsea