import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Tinaco from './tinaco.js'
import Persona from './persona.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'


const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number
 
  @column()
  declare fullName: string | null

  @column()
  public usuario!: string  //nombre del usuario

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Tinaco, {
    foreignKey: 'id_usuario',
  })
  public tinacos!: HasMany<typeof Tinaco>

  @hasMany(() => Persona, {
    foreignKey: 'id_usuario',
  })
  public personas!: HasMany<typeof Persona>

  static accessTokens = DbAccessTokensProvider.forModel(User)
}