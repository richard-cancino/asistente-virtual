import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
//import { Producto } from './producto.entity';
import { RecetaMedica } from './receta_medica.entity';

@Entity({
  name: 'recetas_medicas_productos',
})
export class RecetaMedicaProducto {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   type: 'int',
  //   name: 'producto_id',
  //   default: null,
  // })
  // productoId: number;

  // @ManyToOne(() => Producto, (producto) => producto.recetasMedicaProductos)
  // @JoinColumn({
  //   name: 'producto_id',
  //   referencedColumnName: 'id',
  // })
  // producto: Producto;

  @Column({
    type: 'int',
    name: 'receta_medica_id',
    default: null,
  })
  recetaMedicaId: number;

  @ManyToOne(
    () => RecetaMedica,
    (recetaMedica) => recetaMedica.recetasMedicaProductos
  )
  @JoinColumn({
    name: 'receta_medica_id',
    referencedColumnName: 'id',
  })
  recetaMedica: RecetaMedica;

  @Column({
    length: 255,
    name: 'nombre_producto',
  })
  nombreProducto: string;

  @Column({
    length: 255,
  })
  indicacion: string;
}
