export class ValidationConstants {
  public static readonly MESSAGE_RESPONSE_GET_SUCCESS : string = "{0}: Obtenido satisfactoriamente";
  public static readonly MESSAGE_RESPONSE_POST_SUCCESS : string = "{0}: Registrado satisfactoriamente";
  public static readonly MESSAGE_RESPONSE_PUT_SUCCESS : string = "{0}: Actualizado satisfactoriamente";
  public static readonly MESSAGE_RESPONSE_DELETE_SUCCESS : string = "{0}: Eliminado satisfactoriamente";
  public static readonly MESSAGE_RESPONSE_NOT_FOUND : string = "No se encontró {0} con el id: {1}";

  public static readonly MESSAGE_RESPONSE_DUPLICATE : string = "{0}: Registro duplicado, por favor ingrese otro valor para el campo {1}";

  public static readonly VALIDATION_MESSAGE_IS_STRING: string = "$property debe ser del tipo texto";
  public static readonly VALIDATION_MESSAGE_IS_BOOLEAN: string = "$property debe ser del tipo boolean";
  public static readonly VALIDATION_MESSAGE_IS_FLOAT: string = "$property debe ser del tipo float";
  public static readonly VALIDATION_MESSAGE_IS_INT: string = "$property debe ser del tipo entero";
  public static readonly VALIDATION_MESSAGE_IS_EMAIL: string = "$property debe ser del tipo email";
  public static readonly VALIDATION_MESSAGE_IS_ARRAY: string = "$property debe ser del tipo array";

  public static readonly VALIDATION_MESSAGE_FIXED_LENGTH: string = "$property: Debe tener $constraint1 caracteres.";
  public static readonly VALIDATION_MESSAGE_IS_NOT_EMPTY: string = "$property no puede estar vacío";

  public static readonly VALIDATION_DTO: string = "Ha ocurrido un error en el envío de datos";
  public static readonly MESSAGE_NOT_CHANGED: string = "No se ha actualizado la entidad requerida";
}