import { Column, Model, Table } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import { Role } from '../../constants';

@Table({
  modelName: 'users',
  tableName: 'users',
  defaultScope: { attributes: { exclude: ['password'] } },
})
export class User extends Model<User> {
  @Column({
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  first_name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: true,
  })
  last_name: string;

  @Column({
    type: DataTypes.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataTypes.STRING,
    values: Object.values(Role),
    defaultValue: Role.User,
  })
  role: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  createdAt: string;

  @Column({
    type: DataTypes.DATE,
    allowNull: false,
  })
  updatedAt: string;
}
