import {
Entity,
Column,
PrimaryGeneratedColumn,
CreateDateColumn,
UpdateDateColumn,
OneToMany,
OneToOne,
JoinColumn,
} from 'typeorm';

import Transaction from './Transaction';

@Entity('categories')
class Category {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // @OneToMany((type) => Transaction, (transaction) => transaction.category_id)
  // @JoinColumn({ name: 'id' })
  // transaction: Transaction;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Category;
