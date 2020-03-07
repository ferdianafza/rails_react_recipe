class Api::V1::StudentsController < ApplicationController
  def index
  	student = Student.all.order(created_at: :desc)
    render json: student
  end

  def create
    student = Student.create!(student_params)
    if student
      render json: student
    else
      render json: student.errors
    end
  end

  def edit
    if student
      render json: student
    else
      render json: student.errors
    end
  end

  def show
    if student
      render json: student
    else
      render json: student.errors
    end
  end

  def destroy
    student&.destroy
    render json: { message: 'Student deleted!' }
  end

  def update
    student.update(student_params)
    render json: student
  end


  private

   def student_params
     params.permit(:name, :image, :ingredients, :instruction)
   end

   def student
    @student ||= Student.find(params[:id])
   end
end
