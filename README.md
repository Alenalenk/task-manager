Як зазвичай виглядає app у великому проекті
app/

├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── register/
│       └── page.tsx
│
├── dashboard/
│   ├── page.tsx
│   └── loading.tsx
│
├── users/
│   └── page.tsx
│
├── api/
│   └── users/
│       └── route.ts
│
├── layout.tsx
└── not-found.tsx
2. components/ — UI компоненти

Тут лежать компоненти, які не знають про бізнес.

Наприклад:

components/

├── ui/
└── layout/
components/ui

Малі універсальні компоненти:

components/ui/

Button.tsx
Input.tsx
Modal.tsx
Card.tsx
Dropdown.tsx

Наприклад:

export function Button({
children
}){

return (

<button>
{children}
</button>

)

}

Він не знає:

хто користувач;
яка база;
який товар.

Він просто кнопка.

components/layout

Компоненти структури:

components/layout/

Header.tsx
Sidebar.tsx
Footer.tsx
Navbar.tsx

Наприклад:

export function Sidebar(){

return (
<aside>
Menu
</aside>
)

}
3. features/ — бізнес-функціонал

Це найважливіша частина.

features/

├── auth/
├── users/
└── products/

Кожна фіча — окремий модуль.

Наприклад:

features/users/

├── components/
│   ├── UserCard.tsx
│   └── UserTable.tsx
│
├── user.service.ts
├── user.store.ts
├── user.schema.ts
└── types.ts
components

UI конкретної фічі.

Наприклад:

UserCard.tsx
export function UserCard({
name
}){

return (
<div>
{name}
</div>
)

}
service

Бізнес-логіка.

Наприклад:

user.service.ts
export async function getUsers(){

return prisma.user.findMany()

}

Компонент не знає як отримати користувачів.

Він викликає:

const users = await getUsers()
schema

Валідація.

Наприклад через Zod:

user.schema.ts
import {z} from "zod"


export const userSchema =
z.object({

email:z.string().email(),

name:z.string()

})
store

Стан клієнта.

Наприклад Zustand:

user.store.ts
export const useUserStore =
create(()=>({

selectedUser:null

}))
4. lib/ — технічна інфраструктура
lib/

├── prisma.ts
└── utils.ts

Тут речі, які використовуються всюди.

prisma.ts

Підключення до БД:

lib/prisma.ts
import {PrismaClient}
from "@prisma/client"


export const prisma =
new PrismaClient()

Використання:

import {prisma}
from "@/lib/prisma"
utils.ts

Допоміжні функції.

Наприклад:

export function cn(
...classes:string[]
){

return classes.join(" ")

}

Або:

formatDate()
formatPrice()
generateId()
5. hooks/ — власні React hooks

Тут:

hooks/

useDebounce.ts
useMediaQuery.ts
useAuth.ts

Наприклад:

export function useDebounce(value){

}

Використання:

const search =
useDebounce(input)
6. types/ — глобальні типи

Тут типи, які використовуються багато де.

Наприклад:

types/

user.ts
api.ts
common.ts

user.ts

export interface User {

id:string

email:string

name:string

}

Потім:

import {User}
from "@/types/user"
7. tests/

Тести.

Наприклад:

tests/

├── unit/
│   └── price.test.ts
│
├── integration/
│   └── user.test.ts
│
└── e2e/
    └── login.spec.ts
Unit

Перевірка функції:

calculatePrice()
Integration

Перевірка:

API
 ↓
Service
 ↓
Database
E2E

Перевірка користувацького сценарію:

Відкрив сайт

↓

Увійшов

↓

Створив товар
Як усе зв'язується разом

Наприклад сторінка користувачів:

app/users/page.tsx
import {UserTable}
from "@/features/users/components/UserTable"


export default function UsersPage(){

return (
<UserTable/>
)

}

↓

Компонент:

features/users/components/UserTable.tsx

викликає:

user.service.ts

↓

service:

prisma.user.findMany()

↓

База:

PostgreSQL

Візуально:

                 Browser

                    |
                    ↓

              app/page.tsx

                    |
                    ↓

        features/users/components

                    |
                    ↓

          features/users/service

                    |
                    ↓

               lib/prisma

                    |
                    ↓

              PostgreSQL
Чому така структура хороша

Припустимо, у тебе CRM:

features/

auth
users
products
orders
payments
notifications

Коли додаєш оплату:

ти створюєш:

features/payments/

і майже не чіпаєш інший код.

Для невеликого проекту можна спростити:

src/

app/
components/
lib/

Але коли проект росте, features/ сильно допомагає не перетворити код у хаос.