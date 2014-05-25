class JsLibrariesController < ApplicationController
  #client = HTTPClient.new
  #puts client.get_content('http://www.example.com/index.html')
  before_action :load_library, except: [:index, :new, :create]

  def load_library
    @js_library = JsLibrary.find(params[:id])
  end

  def index
    @js_libraries = JsLibrary.order(:name, 'version desc')
    @js_library = JsLibrary.new
  end

  def new
    @js_library = JsLibrary.new
  end

  def create
    @js_library = JsLibrary.new(js_library_params)
    @js_library.enabled = true
    if @js_library.check_url_and_save!
      flash[:notice] = 'Js Library Accepted'
    else
      flash[:error] = 'Error saving the library, check the provided URL and try again'
    end
    redirect_to action: :index
  end

  def destroy
    @js_library.delete
    redirect_to action: :index
  end

  def toggle_enabled
    @js_library.toggle_enabled!
    redirect_to :back
  end

private
  def js_library_params
    params.require(:js_library).permit(:name,:version,:path)
  end

end
