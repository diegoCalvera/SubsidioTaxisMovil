export interface Usuario {
  id: string;
  usuario: string;
  contrasena: string;
  rol: string;
  placa: string;
  activo: boolean;
  nombre_estacion?: string;
}
