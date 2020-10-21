class PostsController < ApplicationController
  def index
    @posts = Post.all     #Postモデルを.allで全て取得@postsへ代入
  end

  def new
    
  end

  def create
    Post.create(content: params[:content])
  end
end
