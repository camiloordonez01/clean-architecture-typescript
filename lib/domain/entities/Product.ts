import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Length, IsUrl } from 'class-validator'

@Entity('products')
class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Length(4, 10)
    @Column()
    sku: number

    @Column()
    name: string

    @Length(10, 255)
    @Column()
    description?: string

    @IsUrl()
    @Column()
    image?: string

    constructor(
        id: number,
        sku: number,
        name: string,
        description?: string,
        image?: string
    ) {
        this.id = id
        this.sku = sku
        this.name = name
        this.description = description
        this.image = image
    }
}

export default Product
