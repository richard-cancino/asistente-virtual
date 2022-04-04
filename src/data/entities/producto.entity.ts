import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecetaMedicaProducto } from './receta_medica_producto.entity';

@Entity({
  name: 'productos',
})
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 64,
  })
  codigo: string;

  @Column({
    length: 64,
  })
  nombre: string;

  // @OneToMany(
  //   () => RecetaMedicaProducto,
  //   (recetasMedicaProducto) => recetasMedicaProducto.producto
  // )
  // recetasMedicaProductos: RecetaMedicaProducto[];
}
