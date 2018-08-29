class RegistrationsController < DeviseTokenAuth::RegistrationsController
  def create
    super
  end

  def sign_up_params
    params.require(:user).permit(:name, :email, :password, :role)
  end

  def account_update_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end