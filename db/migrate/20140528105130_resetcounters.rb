class Resetcounters < ActiveRecord::Migration
  def change
    Game.find_each(select: 'id') do |result|
      Game.reset_counters(result.id, :highscores)
    end
  end
end
