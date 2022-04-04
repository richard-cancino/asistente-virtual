import { injectable } from 'inversify';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import { PacientesRepository } from '@data/repositories';
import { SignupDto } from '@logic/dtos/auth/signup.dto';
import { AuthResponse } from '../interfaces/IAuthResponse';
import { LoginDto } from '@logic/dtos/auth/login.dto';

@injectable()
export class AuthService {
  constructor() {}

  async signup(body: SignupDto): Promise<AuthResponse> {
    try {
      const pacientesRepository = getCustomRepository(PacientesRepository);

      const oldPatient = await pacientesRepository.findOne({
        codigoConadis: body.codigoConadis,
      });
      if (oldPatient) {
        return {
          success: false,
          message: 'El paciente ya existe. Por favor, inicia sesión.',
        };
      }

      const encryptedPassword = await bcrypt.hash(body.password, 10);
      const patient = await pacientesRepository.save({
        nombres: body.nombres,
        apellidos: body.apellidos,
        telefono: body.telefono,
        direccion: body.direccion,
        fechaNacimiento: body.fechaNacimiento,
        codigoConadis: body.codigoConadis.toLowerCase(),
        password: encryptedPassword,
      });

      const token = jwt.sign({ userId: patient?.id }, process.env.TOKEN_KEY, {
        expiresIn: '12h',
      });

      return {
        success: true,
        data: { ...patient, token },
      };
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async login(body: LoginDto): Promise<AuthResponse> {
    try {
      const pacientesRepository = getCustomRepository(PacientesRepository);

      const patient = await pacientesRepository.findOne({
        codigoConadis: body.codigoConadis,
      });

      if (patient && (await bcrypt.compare(body.password, patient.password))) {
        const token = jwt.sign({ userId: patient.id }, process.env.TOKEN_KEY, {
          expiresIn: '12h',
        });

        return {
          success: true,
          data: { ...patient, token },
        };
      } else {
        return {
          success: false,
          message: 'Credenciales inválidas.',
        };
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
