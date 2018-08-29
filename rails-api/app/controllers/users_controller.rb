class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = User.all
    @users = User.where("name LIKE ? OR email LIKE ?", "%#{params[:search]}%", "%#{params[:search]}%") if params[:search].present?
    @users = @users.where(role: params[:filter_by_role]).paginate(page: params[:page], per_page: 10) if params[:filter_by_role].present?
    @users = @users.paginate(page: params[:page], per_page: 10)
         
    render json: { users: @users, total_pages: @users.total_pages }
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(user_params)
    @user.password = SecureRandom.hex(8)
    if @user.save
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @user.destroy
    if @user.destroy
      head :no_content, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    if current_user.admin?
      params.require(:user).permit(:email, :name, :role)
    else
      params.require(:user).permit(:email, :name)
    end
  end

  def set_user
    @user = User.find(params[:id])
  end
end
