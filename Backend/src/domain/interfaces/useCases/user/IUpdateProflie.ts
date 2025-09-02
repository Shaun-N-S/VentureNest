import { UpdateUserDTO } from "application/dtos/User/updateUserDTO";

export interface IUpdateUserProfileUseCase {
  updateUserProfile(updateData: UpdateUserDTO): Promise<UpdateUserDTO>;
}
