import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Sword, Heart, Coins, Star, CheckCircle, Plus, RefreshCw, Shield } from 'lucide-react';
import { format } from 'date-fns'; // Import date-fns for date manipulation

const GamifiedDashboard = () => {
    const [playerStats, setPlayerStats] = useState({
        name: "Shiven",
        hp: 100,
        maxHp: 100,
        gold: 127,
        level: 1,
        xp: 129,
        maxXp: 200,
        streak: 0, // New streak tracking
        lastDay: format(new Date(), 'yyyy-MM-dd'), // Track last day player was active
    });

    const [tasks, setTasks] = useState([
        { name: "PWA", xp: 80, gold: 77, status: "Not started", tags: ["Development"], isDaily: true },
        { name: "DSA Question", xp: 23, gold: 43, status: "Not started", tags: ["Study"], isDaily: true },
        { name: "Personal Development", xp: 20, gold: 1, status: "Not started", tags: ["Books", "Exercise"], isDaily: true },
        { name: "Project", xp: 6, gold: 6, status: "Not started", tags: ["Development"], isDaily: false }
    ]);

    const [newTask, setNewTask] = useState({
        name: "",
        xp: 0,
        gold: 0,
        tags: "",
        isDaily: false
    });

    // Level up function
    const checkLevelUp = (currentXp, currentLevel, currentMaxXp) => {
      if (currentXp >= currentMaxXp) {
        const remainingXp = currentXp - currentMaxXp;
        const newLevel = currentLevel + 1;
        const newMaxXp = Math.floor(currentMaxXp * 1.5); // Increase XP requirement for next level

        return {
          level: newLevel,
          xp: remainingXp,
          maxXp: newMaxXp,
        };
      }
      return null;
    };

  // Complete task function
    const completeTask = (index) => {
        const newTasks = [...tasks];
        const task = newTasks[index];

      setPlayerStats(prev => {
        const newXp = prev.xp + task.xp;
        const levelUp = checkLevelUp(newXp, prev.level, prev.maxXp);
        let newStreak = prev.streak;
        
         // Check if today is a new day for streak purposes
        const today = format(new Date(), 'yyyy-MM-dd');
        if(today !== prev.lastDay) {
             newStreak = prev.streak + 1;
        }

        if (levelUp) {
          return {
            ...prev,
            ...levelUp,
            gold: prev.gold + task.gold + 100, // Bonus gold for level up
             hp: Math.min(prev.maxHp, prev.hp + prev.streak * 2), // Restore HP on level up + streak bonus
             streak: newStreak,
             lastDay: today
          };
        }

        return {
            ...prev,
            gold: prev.gold + task.gold,
            xp: newXp,
            streak: newStreak,
            lastDay: today,
        };
      });

        newTasks[index] = { ...task, status: "Completed" };
        setTasks(newTasks);
    };

    // Reset daily quests
    const resetDailyQuests = () => {
        setTasks(prev =>
            prev.map(task => ({
                ...task,
                status: task.isDaily ? "Not started" : task.status
            }))
        );
    };

    // Add new task
    const addNewTask = () => {
        if (newTask.name && newTask.xp > 0 && newTask.gold > 0) {
            setTasks(prev => [...prev, {
                ...newTask,
                status: "Not started",
                tags: newTask.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            }]);

            // Reset form
            setNewTask({
                name: "",
                xp: 0,
                gold: 0,
                tags: "",
                isDaily: false
            });
        }
    };

    // Function to check if any daily tasks have been completed for hp reduction check
    const checkDailyTaskCompletion = () => {
        const hasDailyCompleted = tasks.some(task => task.isDaily && task.status === "Completed");
        return hasDailyCompleted;
    };

    // Check for HP reduction logic
     useEffect(() => {
       const now = new Date();
       const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
       const twelveHoursLater = new Date(startOfDay.getTime() + 12 * 60 * 60 * 1000);

        const hpDecreaseTimer = setTimeout(() => {
            const hasDailyCompleted = checkDailyTaskCompletion();
            setPlayerStats(prev => {
                 // Check if today is a new day for streak purposes
                 const today = format(new Date(), 'yyyy-MM-dd');
                 let newStreak = prev.streak;
                 if (today !== prev.lastDay) {
                     newStreak = 0; // reset streak
                }
            let hpReduction = prev.hp;
            // if the streak is broken then reduce the health
            if (newStreak === 0 && prev.streak > 0) {
                hpReduction -= 10;
            }
                if (!hasDailyCompleted) {
                    if(new Date() > twelveHoursLater){
                    hpReduction -= 5; // reduce 5 hp if no task completed after 12 hours
                  }
                   else{
                     hpReduction -= 1; // Reduce 1 hp if no tasks completed within the first 12hrs
                   }
                }

                 return{
                     ...prev,
                     hp: Math.max(0, hpReduction), // Ensure HP doesn't go below 0
                     streak: newStreak,
                     lastDay: today,
                 }
            });
            // if there no tasks completed after 12hrs then deduct 5 hp if the streak was broken and deduct 10 hp
        }, twelveHoursLater - now);


        return () => clearTimeout(hpDecreaseTimer);

    }, [tasks]);
  
   // Auto-reset daily quests at midnight
   useEffect(() => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
  
    const resetTimer = setTimeout(resetDailyQuests, timeUntilMidnight);
    return () => clearTimeout(resetTimer);
    }, []);

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            {/* Player Stats Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star className="w-6 h-6" />
                        {playerStats.name}'s Stats (Level {playerStats.level})
                    </CardTitle>
                </CardHeader>
                <CardContent>
                   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                       <div className="flex items-center gap-2">
                           <Heart className="text-red-500" />
                           <span>HP: {playerStats.hp}/{playerStats.maxHp}</span>
                      </div>
                       <div className="flex items-center gap-2">
                            <Coins className="text-yellow-500" />
                            <span>Gold: {playerStats.gold}</span>
                       </div>
                       <div className="flex items-center gap-2">
                            <Sword className="text-blue-500" />
                           <span>Level: {playerStats.level}</span>
                       </div>
                       <div className="flex items-center gap-2">
                            <Shield className="text-green-500" />
                           <span>Streak: {playerStats.streak}</span>
                       </div>
                   </div>
                    <div className="mt-4">
                        <div className="text-sm text-gray-500 mb-1">XP Progress</div>
                        <Progress value={(playerStats.xp / playerStats.maxXp) * 100} className="h-2" />
                        <div className="text-xs text-right mt-1">{playerStats.xp}/{playerStats.maxXp} XP</div>
                    </div>
                </CardContent>
            </Card>

            {/* Add New Task Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Plus className="w-6 h-6" />
                        Add New Quest
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            placeholder="Quest name"
                            value={newTask.name}
                            onChange={e => setNewTask(prev => ({ ...prev, name: e.target.value }))}
                        />
                        <Input
                            type="number"
                            placeholder="XP reward"
                            value={newTask.xp}
                            onChange={e => setNewTask(prev => ({ ...prev, xp: parseInt(e.target.value) || 0 }))}
                        />
                        <Input
                            type="number"
                            placeholder="Gold reward"
                            value={newTask.gold}
                            onChange={e => setNewTask(prev => ({ ...prev, gold: parseInt(e.target.value) || 0 }))}
                        />
                         <Input
                            placeholder="Tags (comma-separated)"
                            value={newTask.tags}
                            onChange={e => setNewTask(prev => ({ ...prev, tags: e.target.value }))}
                        />
                       <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={newTask.isDaily}
                                onChange={e => setNewTask(prev => ({ ...prev, isDaily: e.target.checked }))}
                                className="mr-2"
                            />
                            <span>Daily Quest</span>
                        </div>
                        <Button onClick={addNewTask} className="bg-green-500 hover:bg-green-600">
                            Add Quest
                        </Button>
                    </div>
                </CardContent>
            </Card>

           {/* Tasks Card */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                         <CardTitle className="flex items-center gap-2">
                           <CheckCircle className="w-6 h-6" />
                           Daily Quests
                         </CardTitle>
                         <Button onClick={resetDailyQuests} className="flex items-center gap-2">
                                 <RefreshCw className="w-4 h-4" />
                                 Reset Daily Quests
                         </Button>
                    </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                       {tasks.map((task, index) => (
                           <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                  <div className="font-medium">
                                      {task.name}
                                      {task.isDaily && (
                                         <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                           Daily
                                        </span>
                                      )}
                                  </div>
                                 <div className="text-sm text-gray-500">
                                     Rewards: {task.xp} XP, {task.gold} Gold
                                </div>
                                  <div className="flex gap-2 mt-1">
                                       {task.tags.map((tag, tagIndex) => (
                                             <span key={tagIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                {tag}
                                             </span>
                                       ))}
                                  </div>
                               </div>
                               <button
                                  onClick={() => completeTask(index)}
                                  disabled={task.status === "Completed"}
                                    className={`px-4 py-2 rounded ${
                                        task.status === "Completed"
                                           ? "bg-gray-100 text-gray-400"
                                           : "bg-green-500 text-white hover:bg-green-600"
                                   }`}
                               >
                                  {task.status === "Completed" ? "Completed" : "Complete"}
                               </button>
                           </div>
                       ))}
                    </div>
                </CardContent>
           </Card>
        </div>
    );
};

export default GamifiedDashboard;
