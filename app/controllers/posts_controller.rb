class PostsController < ApplicationController
  def index
    @posts = Post.all.order(id: "DESC")     #Postモデルを.allで全て取得@postsへ代入
  end

  def create
    Post.create(content: params[:content])
      redirect_to action: :index
  end

  def checked
    post = Post.find(params[:id])    #Postモデルの中身を参照paramsとしてidカラム？を取得して変数postへ代入
    if post.checked                  #もしpostでcheckアクション(既読かどうか)が実行されていたら
      post.update(checked: false)    #true(既読)の場合、既読を解除するためにcheckedカラムの値をfalseへupdate
    else
      post.update(checked: true)     #false(非既読)の場合、既読をつけるためにcheckedカラムの値をtrueへupdate
    end

    item = Post.find(params[:id])    #更新したレコードを取得し直し、変数itemへ代入
    render json: { post: item }      #renderメソッドでjsonを呼び出し？jsonとしてchecked.jsに返却している
  end
end
