/**
 * DayNest - Game Logic & Sound Engine
 */

// Application State
const state = {
  entries: [],
  settings: {
    theme: 'day',      // 'day' or 'night'
    soundMuted: true, // muted by default as requested
    fridgeOpen: false
  },
  modal: {
    currentStep: 1,
    selectedItem: null,
    selectedOutcome: null,
    customName: '',
    customPlacement: null,
    title: '',
    summary: '',
    tags: ''
  }
};

// ================= TRANSLATION DICTIONARY =================
const translations = {
  en: {
    bringHome: "🌸 Bring today home",
    scrapbook: "Scrapbook",
    nestMemories: "Nest Memories",
    nestMemory: "Nest Memory",
    emptyPrompt: "Your sanctuary is clean and quiet. Click <strong>\"Bring today home\"</strong> to record a memory and nestle it in your room.",
    modalTitleStep1: "Bring Today Home",
    modalSubtitleStep1: "What did you bring home today? Select an item that represents today's energy.",
    modalSubtitleStep3: "Nestle this memory. Add a title and soft thoughts if you feel like sharing.",
    labelTitle: "Today's Title",
    labelSummary: "Short gentle summary (optional)",
    labelTags: "Memory Tags (comma separated)",
    placeholderTitle: "e.g. A Sweet, Quiet Afternoon",
    placeholderSummary: "e.g. Ate a sweet orange and left the peel in a tiny bowl...",
    placeholderTags: "e.g. #fruit, #cozy, #quiet",
    btnBack: "Back",
    btnNext: "Next",
    btnSubmit: "Nestle Memory 🏡",
    confirmReset: "🧹 Would you like to clear your sanctuary and pack all memories away? This will clear all entries.",
    confirmDelete: "🌸 Remove this memory from your sanctuary?",
    catQuotes: [
      "Prr... *yawn* You did well today.",
      "Meow... I'm glad you're home. Let's rest.",
      "*stretches* Sleep when you're tired, okay?",
      "Purr... did you bring something sweet?",
      "Meow... the blanket is extra warm today.",
      "Prr... let's just listen to the stars tonight.",
      "Meow... no pressure. Just take your time.",
      "Purr... you did your best, and that is more than enough.",
      "Meow... have a sip of tea, take a deep breath."
    ],
    toasts: [
      "A new memory found its place.",
      "Today left a little trace.",
      "A small piece of today came home.",
      "The room remembers."
    ],
    customPrompt: "✨ What cozy item did you bring home today? (e.g. wild flowers, wooden shell)",
    step2SubtitleItem: "What happened to it?",
    step2SubtitleCustom: "Where would you like to place your <strong>\"{name}\"</strong> in the room?",
    modalTitleStep2: "About today's {name}",
    customDefaultTitle: "Brought home {name} ✨",
    customDefaultSummary: "Brought home a cozy \"{name}\" today and decided to {placementText}. It looks beautiful in the sanctuary.",
    customDefaultTags: "#{name}, #nest, #today",
    followupKicker: "soft check-in",
    followupTitle: "How did yesterday’s little memory go?",
    followupSubtitle: "No pressure. Just a tiny continuation if you want.",
    followupDismiss: "Not today",
    followupSaved: "A tiny follow-up was tucked into the scrapbook.",
    footerText: "DayNest 🏡 A cozy sanctuary. No streaks. No pressure. Just today, tucked away."
  },
  zh: {
    bringHome: "把今天带回家 🌸",
    scrapbook: "记忆本",
    nestMemories: "个回忆小筑",
    nestMemory: "个回忆小筑",
    emptyPrompt: "你的小窝干净而宁静。点击<strong>“把今天带回家”</strong>记录一段回忆，让它入住小窝。",
    modalTitleStep1: "把今天带回家",
    modalSubtitleStep1: "今天你带了什么回家？选择一样代表今天能量的物品。",
    modalSubtitleStep3: "存进小窝。写个标题，若想分享，也可记下温柔的思绪。",
    labelTitle: "今日主题",
    labelSummary: "温柔的小记（选填）",
    labelTags: "记忆标签（逗号分隔）",
    placeholderTitle: "例如：一个甜蜜而宁静的下午",
    placeholderSummary: "例如：吃了一颗清甜的水果，把果皮放进了小碗里。",
    placeholderTags: "例如：#水果, #温馨, #宁静",
    btnBack: "返回",
    btnNext: "下一步",
    btnSubmit: "存进小窝 🏡",
    confirmReset: "🧹 你确定要清空你的小窝，并将所有的记忆封存吗？这将清除所有记录。",
    confirmDelete: "🌸 要从小窝中移除这段记忆吗？",
    catQuotes: [
      "呼噜…… *哈欠* 今天你做得很好啦。",
      "喵…… 很高兴你回家了。我们休息吧。",
      "*伸懒腰* 累了就睡吧，好吗？",
      "喵呜…… 你带了什么甜甜的东西吗？",
      "咪…… 今天的毯子格外温暖呢。",
      "呼噜…… 今晚我们一起听星星说话吧。",
      "喵…… 别给自己压力，慢慢来。",
      "呼噜…… 你已经尽力了，这便足够好了。",
      "喵…… 喝口茶，深呼吸。"
    ],
    toasts: [
      "新记忆找到了它的归宿。",
      "今天留下了一点温柔的足迹。",
      "今天的一小部分回到了家。",
      "房间静静记下了今天。"
    ],
    customPrompt: "✨ 今天你带了什么温馨的小物回家？(例如：野花、木贝壳)",
    step2SubtitleItem: "发生了什么？",
    step2SubtitleCustom: "你希望把你的<strong>“{name}”</strong>摆放在房间的什么位置？",
    modalTitleStep2: "关于今天的{name}",
    customDefaultTitle: "把{name}带回家 ✨",
    customDefaultSummary: "今天把一朵温馨的“{name}”带回家，决定将其{placementText}。它在小窝里看起来很美。",
    customDefaultTags: "#{name}, #小筑, #今天",
    followupKicker: "小小回访",
    followupTitle: "昨天带回家的小东西后来怎么样了？",
    followupSubtitle: "不催你。只是如果你愿意，可以给它一个后续。",
    followupDismiss: "今天先不了",
    followupSaved: "一个小小后续已经被收进记忆本。",
    footerText: "DayNest 🏡 一个温馨的小窝。没有压力，没有提醒，唯有今天，温柔收藏。"
  }
};

// Preset outcomes definitions and gentle, non-productivity text generators
const outcomeData = {
  fruit: {
    name: 'fruit 🍎',
    nameZh: '水果 🍎',
    emoji: '🍎',
    options: [
      { id: 'fridge', text: 'put it in the fridge', textZh: '放进冰箱', class: 'room-fruit-fridge', label: 'Fruit in the Fridge', labelZh: '冰箱里的水果' },
      { id: 'cut', text: 'cut and ate it', textZh: '切开慢慢吃掉了', class: 'room-fruit-cut', label: 'Fruit Slices', labelZh: '切好的水果' },
      { id: 'peels', text: 'ate it and left the peels', textZh: '吃完留下果皮', class: 'room-fruit-peels', label: 'Fruit Peels', labelZh: '水果皮' },
      { id: 'shared', text: 'shared it with someone', textZh: '和人一起分享', class: 'room-fruit-shared', label: 'Shared Fruit', labelZh: '分享的水果' },
      { id: 'whole', text: 'left it on the table', textZh: '放在了茶几上', class: 'room-fruit-whole', label: 'Fruit Bowl', labelZh: '水果碗' }
    ],
    defaults: {
      fridge: {
        title: 'Fruit Saved for Later 🍎',
        titleZh: '留给之后的水果 🍎',
        summary: 'Brought some fresh fruit home and put it in the fridge. A small sweet thing saved for later.',
        summaryZh: '把今天带回家的水果放进了冰箱。像是给之后的自己存下一点清甜。',
        tags: '#fruit, #fresh, #later',
        tagsZh: '#水果, #新鲜, #留给之后'
      },
      cut: {
        title: 'Fresh Fruit Slices 🍊',
        titleZh: '清甜水果切片 🍊',
        summary: 'Cut up some fruit and ate it slowly. A simple, sweet pause in the middle of the day.',
        summaryZh: '把水果切开，慢慢吃掉。只是很简单的一口清甜，但今天也因此柔软了一点。',
        tags: '#fruit, #sweet, #simple',
        tagsZh: '#水果, #清甜, #简单'
      },
      peels: {
        title: 'Fruit Peels in a Tiny Bowl 🍎',
        titleZh: '小碗里的果皮 🍎',
        summary: 'Ate the fruit before putting anything away. Only a tiny bowl of peels stayed behind as proof.',
        summaryZh: '还没来得及好好收纳，就把水果吃掉了。只剩小碗里的果皮，证明今天有过一点甜。',
        tags: '#fruit, #snack, #trace',
        tagsZh: '#水果, #加餐, #痕迹'
      },
      shared: {
        title: 'Shared Fruit 🍊',
        titleZh: '分享水果的甜 🍊',
        summary: 'Shared some fruit with someone. Fruit tastes softer when it becomes a small shared moment.',
        summaryZh: '把水果分给了身边的人。一起吃的时候，水果好像也变得更甜了一点。',
        tags: '#fruit, #sharing, #warm',
        tagsZh: '#水果, #分享, #温暖'
      },
      whole: {
        title: 'Fruit Bowl on the Table 🍎',
        titleZh: '茶几上的水果碗 🍎',
        summary: 'Placed the fruit on the coffee table. It made the room feel more lived-in and gently full.',
        summaryZh: '把水果放在茶几上。房间一下子多了一点生活气，也多了一点被照顾的感觉。',
        tags: '#fruit, #home, #cozy',
        tagsZh: '#水果, #小家, #温馨'
      }
    }
  },
  milktea: {
    name: 'milk tea 🥤',
    nameZh: '奶茶 🥤',
    emoji: '🥤',
    options: [
      { id: 'fridge', text: 'put it in the fridge for later', textZh: '放进冰箱留给以后', class: 'room-milktea-fridge', label: 'Chilled Milk Tea', labelZh: '冰镇奶茶' },
      { id: 'empty', text: 'drank it immediately', textZh: '立刻喝完了', class: 'room-milktea-empty', label: 'Empty Boba Cup', labelZh: '空奶茶杯' },
      { id: 'shared', text: 'shared it with my pet', textZh: '和宠物一起分享茶时光', class: 'room-milktea-shared', label: 'Shared Tea Time', labelZh: '分享的午茶时光' },
      { id: 'spilled', text: 'spilled some accidentally', textZh: '不小心洒了一点', class: 'room-milktea-spilled', label: 'Spilled Milk Tea', labelZh: '洒出的奶茶' },
      { id: 'desk', text: 'left it on the desk half-finished', textZh: '喝了一半放在了桌上', class: 'room-milktea-desk', label: 'Half-Full Milk Tea', labelZh: '半杯奶茶' }
    ],
    defaults: {
      fridge: {
        title: 'Milk Tea for Later 🥤',
        titleZh: '存下一点甜 🥤',
        summary: 'Saved a sweet cup of milk tea in the fridge. Looking forward to tomorrow\'s sweet boba pause.',
        summaryZh: '把一杯甜甜的奶茶放进了冰箱。已经在期待明天喝到奶茶那一刻的快乐了。',
        tags: '#milktea, #saving, #sweet',
        tagsZh: '#奶茶, #封存, #甜蜜'
      },
      empty: {
        title: 'Tasting Sweet Boba 🥤',
        titleZh: '大口嚼珍珠 🥤',
        summary: 'Drank a rich milk tea with tapioca pearls right away. The sweet, chewy boba hit the spot perfectly.',
        summaryZh: '咕嘟咕嘟把浓郁的奶茶喝光了。香甜又Q弹的珍珠，真是今天最完美的治愈。',
        tags: '#milktea, #boba, #treat',
        tagsZh: '#奶茶, #珍珠, #治愈'
      },
      shared: {
        title: 'Teatime with my Cat 🥤',
        titleZh: '与猫咪的午茶 🥤',
        summary: 'Enjoyed my milk tea and poured a tiny safe cat-treat cup for my sleeping cat. A quiet joint teatime.',
        summaryZh: '一边喝着美味的奶茶，一边给熟睡的猫咪准备了猫罐头。享受了一个安静的午后下午茶。',
        tags: '#milktea, #cat, #teatime',
        tagsZh: '#奶茶, #猫咪, #下午茶'
      },
      spilled: {
        title: 'A Little Spill 🥤',
        titleZh: '小小的翻车 🥤',
        summary: 'Spilled a tiny bit of milk tea on the floor. A little messy, but it\'s okay—mistakes are just tiny ripples in a calm day.',
        summaryZh: '不小心把奶茶洒在地上了一点。虽然收拾有些麻烦，但没关系，生活中的意外也是有趣的点缀。',
        tags: '#milktea, #oops, #calm',
        tagsZh: '#奶茶, #手滑, #淡定'
      },
      desk: {
        title: 'Sipping at the Desk 🥤',
        titleZh: '书桌旁的奶茶 🥤',
        summary: 'Kept my milk tea on the desk to sip slowly while reading. A gentle companion to a quiet afternoon.',
        summaryZh: '把奶茶放在书桌上，一边翻书一边慢悠悠地吸上一口。它是我度过安静午后的温柔伙伴。',
        tags: '#milktea, #desk, #reading',
        tagsZh: '#奶茶, #书桌, #阅读'
      }
    }
  },
  homework: {
    name: 'homework paper 📝',
    nameZh: '作业纸 📝',
    emoji: '📝',
    options: [
      { id: 'neat', text: 'finished and put it away', textZh: '做完了并整齐地收好', class: 'room-homework-neat', label: 'Finished Homework', labelZh: '做完的作业' },
      { id: 'crumpled', text: 'threw it in the corner', textZh: '揉成一团扔在角落', class: 'room-homework-crumpled', label: 'Crumpled Paper', labelZh: '废纸团' },
      { id: 'doodles', text: 'doodled all over it', textZh: '在上面画满了涂鸦', class: 'room-homework-doodles', label: 'Doodled Paper', labelZh: '涂鸦纸' },
      { id: 'studied', text: 'studied hard all night', textZh: '挑灯夜读，学了很久', class: 'room-homework-studied', label: 'Studied Paper & Lamp', labelZh: '读书痕迹' },
      { id: 'under-rug', text: 'hid it under the rug', textZh: '塞到了地毯下面', class: 'room-homework-under-rug', label: 'Hidden Homework', labelZh: '藏起来的作业' }
    ],
    defaults: {
      neat: {
        title: 'Homework Accomplished! 📝',
        titleZh: '作业搞定！📝',
        summary: 'Finished my homework tasks and neatly stacked the paper away. Feeling light and satisfied with my effort.',
        summaryZh: '写完了今天所有的功课，整整齐齐地把作业收起来。伸个懒腰，感觉心里轻松又满足。',
        tags: '#study, #finished, #peace',
        tagsZh: '#功课, #完成, #满足'
      },
      crumpled: {
        title: 'Crumpled Paper Release 📝',
        titleZh: '纸团的宣泄 📝',
        summary: 'Got frustrated with work today, so I crumpled the page up and tossed it in the corner. Tomorrow is a fresh sheet.',
        summaryZh: '今天写东西有些烦躁，索性把纸揉成一团扔进了角落。没关系，明天又是全新的一天。',
        tags: '#tired, #lettinggo, #freshstart',
        tagsZh: '#疲惫, #放下, #明天见'
      },
      doodles: {
        title: 'Scribbles & Doodles 📝',
        titleZh: '空白处的乱涂乱画 📝',
        summary: 'Allowed myself to drift off and doodle little cats and stars all over my notes. Sometimes play is the best work.',
        summaryZh: '写功课的时候走神了，在笔记本边缘画满了小猫和星星。偶尔的放空，才是最好的休息。',
        tags: '#creative, #doodling, #playful',
        tagsZh: '#创意, #涂鸦, #放空'
      },
      studied: {
        title: 'Glow of Learning 📝',
        titleZh: '夜读的微光 📝',
        summary: 'Studied diligently with the desk lamp shining warm light. Reading and learning, taking it step by simple step.',
        summaryZh: '在台灯暖洋洋的灯光下认真地学习。安静地阅读、写字，一步一个脚印地充实自己。',
        tags: '#studying, #focused, #learning',
        tagsZh: '#夜学, #专注, #学习'
      },
      'under-rug': {
        title: 'Tucked Under the Rug 📝',
        titleZh: '眼不见心不烦 📝',
        summary: 'Decided I didn\'t want to look at work today. Tucked it under the rug. Giving myself permission to rest.',
        summaryZh: '今天真的不想碰任何学习和工作，悄悄地把它藏在了地毯下。允许自己彻底休息一天。',
        tags: '#rest, #nopressure, #quiet',
        tagsZh: '#休息, #无压力, #偷懒'
      }
    }
  },
  book: {
    name: 'a book 📖',
    nameZh: '一本书 📖',
    emoji: '📖',
    options: [
      { id: 'desk', text: 'put it on the desk', textZh: '放在书桌上', class: 'room-book-desk', label: 'New Book on Desk', labelZh: '桌上的书' },
      { id: 'bed', text: 'read a few pages in bed', textZh: '在床上翻了页', class: 'room-book-bed', label: 'Open Book on Bed', labelZh: '床头的书' },
      { id: 'under-pet', text: 'fell asleep reading it', textZh: '读书读到睡着了', class: 'room-book-under-pet', label: 'Book under Cat', labelZh: '被猫咪压着的书' },
      { id: 'glowing', text: 'read it cover to cover', textZh: '一口气读完了整本', class: 'room-book-glowing', label: 'Completed Glowing Book', labelZh: '读完的光芒之书' },
      { id: 'borrowed', text: 'lent it to a friend', textZh: '借给了一位朋友', class: 'room-book-borrowed', label: 'Lent Book Note', labelZh: '借书小条' }
    ],
    defaults: {
      desk: {
        title: 'A New Book Awaits 📖',
        titleZh: '等待翻阅的新书 📖',
        summary: 'Placed a beautiful book on my desk. Its cover promises new adventures and soft thoughts. Can\'t wait to start.',
        summaryZh: '在桌上放了一本精美的新书。精装的封皮预示着奇妙的冒险与温柔的情感。真期待翻开它。',
        tags: '#books, #reading, #anticipation',
        tagsZh: '#阅读, #新书, #期待'
      },
      bed: {
        title: 'Reading Under Blankets 📖',
        titleZh: '被窝里的阅读 📖',
        summary: 'Curled up in bed and turned a few pages. Getting lost in a gentle story under warm blankets is pure bliss.',
        summaryZh: '钻进暖烘烘的被子里翻了几页书。在温暖的被窝中迷失在温柔的故事里，是纯粹的幸福。',
        tags: '#reading, #bedtime, #cozy',
        tagsZh: '#阅读, #被窝, #惬意'
      },
      'under-pet': {
        title: 'Napping on Stories 📖',
        titleZh: '猫咪压着的睡意 📖',
        summary: 'Was reading peacefully until my eyes grew heavy. Slept off, and my cat curled up right on top of the open pages.',
        summaryZh: '本来在静静地看书，但眼皮越来越重。不知不觉睡着了，醒来发现猫咪正缩在开着的书页上。',
        tags: '#reading, #sleepy, #cat',
        tagsZh: '#阅读, #犯困, #猫咪'
      },
      glowing: {
        title: 'Read Cover to Cover 📖',
        titleZh: '读完了整本书 📖',
        summary: 'Finished reading a whole book today. A wonderful story that left me with a warm, glowing feeling inside.',
        summaryZh: '今天把一本书完完整整地读完了。这是一个极其美妙的故事，读完后内心感到无比温暖与平静。',
        tags: '#reading, #completed, #magic',
        tagsZh: '#阅读, #读完, #温暖'
      },
      borrowed: {
        title: 'Lending a Story 📖',
        titleZh: '文字的传递 📖',
        summary: 'Lent my favorite book to a close friend, hoping the pages bring them the same joy they brought me.',
        summaryZh: '把我很喜欢的一本书借给了好友，留了一张字条。希望书中的文字也能带给他们同样的快乐。',
        tags: '#books, #sharing, #friendship',
        tagsZh: '#借书, #分享, #友情'
      }
    }
  },
  badmood: {
    name: 'a bad mood ☁️',
    nameZh: '坏心情 ☁️',
    emoji: '☁️',
    options: [
      { id: 'blanket', text: 'cried it out under the blankets', textZh: '躲在被子里哭了一场', class: 'badmood-blanket-lump', label: 'Hiding under Blanket', labelZh: '躲在被子里的烦恼' },
      { id: 'comfort', text: 'talked it out with my pet', textZh: '和猫咪倾诉了烦恼', class: 'room-badmood-comfort', label: 'Cat\'s Comfort', labelZh: '猫咪的温柔倾听' },
      { id: 'trash', text: 'wrote it down and crumpled it', textZh: '写下来揉成纸团扔掉', class: 'room-badmood-trash', label: 'Discarded Sadness', labelZh: '扔掉的难过' },
      { id: 'slept', text: 'slept it off', textZh: '睡了一大觉', class: 'room-badmood-slept', label: 'Slept off Bad Mood', labelZh: '呼呼睡走烦恼' },
      { id: 'cloud', text: 'let a dark cloud float over the room', textZh: '允许一朵乌云飘在房间', class: 'room-badmood-cloud', label: 'Floating Raincloud', labelZh: '房间的乌云' }
    ],
    defaults: {
      blanket: {
        title: 'Hiding in the Nest ☁️',
        titleZh: '躲进避风港 ☁️',
        summary: 'Felt overwhelmed. I hid under the heavy blankets and let myself cry. Giving myself space to feel bad is okay.',
        summaryZh: '今天感觉累坏了。我躲进厚厚沉沉的被子里痛快地哭了一场。给自己空间去难过，也是可以的。',
        tags: '#feelings, #nesting, #healing',
        tagsZh: '#心情, #躲避, #自我治愈'
      },
      comfort: {
        title: 'Whispered Worries ☁️',
        titleZh: '对着猫咪悄悄说 ☁️',
        summary: 'Talked out my heavy thoughts to my cat. They sat beside me, purring softly. The perfect, quiet listener.',
        summaryZh: '抱着猫咪把积压的心事悄悄讲给它听。它只是静静蜷在我身旁，发出温柔的呼噜声。猫咪是最好的倾听者。',
        tags: '#comfort, #pet, #understanding',
        tagsZh: '#倾诉, #猫咪, #治愈'
      },
      trash: {
        title: 'Tossing Bad Thoughts ☁️',
        titleZh: '揉皱负能量 ☁️',
        summary: 'Wrote down all the thoughts weighing me down on a scrap paper, crumpled it tight, and threw it away. Good riddance.',
        summaryZh: '把所有压抑和不快的心思都写在一张小纸条上，揉得紧紧地扔进了垃圾桶。好啦，翻篇啦！',
        tags: '#release, #cleanse, #movingon',
        tagsZh: '#宣泄, #翻篇, #释放'
      },
      slept: {
        title: 'Slept it Off ☁️',
        titleZh: '睡吧，烦恼 ☁️',
        summary: 'Felt gloomy, so I closed my eyes and took a long nap. Woke up feeling much softer and calmer.',
        summaryZh: '心情很低落，于是闭上双眼，舒舒服服睡了个长长的午觉。醒来觉得心头轻松了许多。',
        tags: '#nap, #rest, #refresh',
        tagsZh: '#睡觉, #休息, #放松'
      },
      cloud: {
        title: 'Allowing the Cloud ☁️',
        titleZh: '留一朵乌云 ☁️',
        summary: 'A gloomy cloud hung over me today. I decided to let it float around instead of fighting it. Clouds eventually pass.',
        summaryZh: '今天头顶似乎飘着一朵乌云。我不打算勉强自己开心，就让它暂时在那儿吧，乌云总会有散去的时候。',
        tags: '#patience, #gloomy, #acceptance',
        tagsZh: '#接纳, #乌云, #顺其自然'
      }
    }
  },
  custom: {
    name: 'custom item ✨',
    nameZh: '自定义物品 ✨',
    emoji: '✨',
    options: [
      { id: 'desk', text: 'put it on the desk', textZh: '摆在书桌上', class: 'room-custom-desk', label: 'Custom Item', labelZh: '特别的小物' },
      { id: 'table', text: 'place it on the coffee table', textZh: '摆在茶几上', class: 'room-custom-table', label: 'Custom Item', labelZh: '特别的小物' },
      { id: 'pet', text: 'nestle it next to the cat', textZh: '放在猫咪旁边', class: 'room-custom-pet', label: 'Custom Item', labelZh: '给猫咪的小礼物' },
      { id: 'rug', text: 'tuck it under the rug', textZh: '藏在地毯下面', class: 'room-custom-rug', label: 'Custom Item', labelZh: '地毯下的秘密' },
      { id: 'float', text: 'let it float in the room', textZh: '让它在房间里漂浮', class: 'room-custom-float', label: 'Custom Item', labelZh: '漂浮的微光' }
    ],
    defaults: {
      desk: { title: 'Brought something cozy home ✨', titleZh: '把美好带回家 ✨', summary: 'Found a lovely item today and placed it on my desk.', summaryZh: '今天发现了一样可爱的小物件，轻轻把它摆在了书桌上。', tags: '#found, #desk', tagsZh: '#收集, #书桌' },
      table: { title: 'Tucked away on the table ✨', titleZh: '桌上的温馨一角 ✨', summary: 'Decorated the coffee table with a new sweet token.', summaryZh: '把今天捡到的宝贝摆在茶几上当做装饰。小窝又多了一份生活情调。', tags: '#found, #home', tagsZh: '#收集, #茶几' },
      pet: { title: 'A Gift for my Cat ✨', titleZh: '给小猫的礼物 ✨', summary: 'Brought something cute home and snuggled it next to the sleeping cat.', summaryZh: '把一个精致可爱的小玩意，悄悄挨着睡着的小猫咪放下。', tags: '#found, #cat', tagsZh: '#礼物, #猫咪' },
      rug: { title: 'Tucked Safely Away ✨', titleZh: '藏好小秘密 ✨', summary: 'Found a small secret token and hid it safely under the rug.', summaryZh: '把一个承载着今天秘密的纪念物，藏到了厚厚的地毯下。', tags: '#secret, #cozy', tagsZh: '#秘密, #地毯' },
      float: { title: 'Floating Sparkle ✨', titleZh: '漂浮的荧光 ✨', summary: 'Brought a magical item home and let it float softly in the air.', summaryZh: '今天把一样神奇的微光小物带回家，看它在房间的空中慢慢地浮动。', tags: '#magic, #float', tagsZh: '#漂浮, #魔法' }
    }
  }
};

// ================= WEB AUDIO SYNTHESIZER =================
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playNote(freq, oscType, duration, delay = 0) {
  if (state.settings.soundMuted) return;
  initAudio();
  
  setTimeout(() => {
    try {
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      osc.type = oscType; // 'triangle' (warm, soft) or 'sine' (pure, floaty)
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      
      gainNode.gain.setValueAtTime(0.001, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration - 0.02);
      
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn("Audio feedback blocked:", e);
    }
  }, delay * 1000);
}

function playChime(preset) {
  if (state.settings.soundMuted) return;
  
  if (preset === 'click') {
    playNote(523.25, 'triangle', 0.12); // C5
  } else if (preset === 'pet') {
    playNote(659.25, 'triangle', 0.18, 0); // E5
    playNote(783.99, 'triangle', 0.22, 0.08); // G5
  } else if (preset === 'day') {
    playNote(261.63, 'sine', 0.4, 0); // C4
    playNote(329.63, 'sine', 0.4, 0.08); // E4
    playNote(392.00, 'sine', 0.4, 0.16); // G4
    playNote(523.25, 'sine', 0.5, 0.24); // C5
  } else if (preset === 'night') {
    playNote(392.00, 'sine', 0.4, 0); // G4
    playNote(349.23, 'sine', 0.4, 0.08); // F4
    playNote(293.66, 'sine', 0.4, 0.16); // D4
    playNote(220.00, 'sine', 0.6, 0.24); // A3
  } else if (preset === 'success') {
    playNote(523.25, 'triangle', 0.15, 0);
    playNote(659.25, 'triangle', 0.15, 0.06);
    playNote(783.99, 'triangle', 0.15, 0.12);
    playNote(1046.50, 'triangle', 0.35, 0.18);
  } else if (preset === 'fridge') {
    playNote(330, 'triangle', 0.15, 0);
    playNote(220, 'triangle', 0.2, 0.05);
  }
}

// ================= DOM ELEMENT REFERENCES =================
const DOM = {
  themeToggleBtn: document.getElementById('btn-theme-toggle'),
  soundToggleBtn: document.getElementById('btn-sound-toggle'),
  resetBtn: document.getElementById('btn-reset'),
  bringHomeBtn: document.getElementById('btn-bring-home'),
  langToggleBtn: document.getElementById('btn-lang-toggle'),
  
  // Modal Elements
  modalOverlay: document.getElementById('modal-overlay'),
  modalCloseBtn: document.getElementById('btn-close-modal'),
  modalTitle: document.getElementById('modal-title'),
  modalBody: document.getElementById('modal-body'),
  modalBackBtn: document.getElementById('btn-modal-back'),
  modalNextBtn: document.getElementById('btn-modal-next'),
  modalSubmitBtn: document.getElementById('btn-modal-submit'),
  
  step1: document.getElementById('step-1-content'),
  step2: document.getElementById('step-2-content'),
  step3: document.getElementById('step-3-content'),
  
  // Inputs
  storyTitle: document.getElementById('story-title'),
  storySummary: document.getElementById('story-summary'),
  storyTags: document.getElementById('story-tags'),
  
  // Scrapbook
  scrapbookList: document.getElementById('scrapbook-list'),
  scrapbookEmpty: document.getElementById('scrapbook-empty'),
  scrapbookCount: document.getElementById('scrapbook-count'),
  
  // Room SVGs & interactive nodes
  roomSvg: document.getElementById('room-svg'),
  roomWindow: document.getElementById('room-window'),
  fridgeDoorClosed: document.getElementById('fridge-door-closed'),
  fridgeDoorOpened: document.getElementById('fridge-door-opened'),
  roomFridge: document.getElementById('room-fridge'),
  catSleeping: document.getElementById('cat-sleeping'),
  roomTooltip: document.getElementById('room-item-tooltip'),
  roomWrapper: document.querySelector('.room-wrapper'),
  catBubble: document.getElementById('cat-bubble'),
  catBubbleText: document.getElementById('cat-bubble-text'),
  clockHourHand: document.getElementById('clock-hour-hand'),
  clockMinuteHand: document.getElementById('clock-minute-hand'),
  followupCard: document.getElementById('followup-card'),
  followupTitle: document.getElementById('followup-title'),
  followupSubtitle: document.getElementById('followup-subtitle'),
  followupOptions: document.getElementById('followup-options'),
  followupDismiss: document.getElementById('followup-dismiss')
};

// ================= APP INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  applySettings();
  applyLang(state.settings.lang || 'en');
  renderRoom();
  renderScrapbook();
  renderFollowUp();
  updateClock();
  applyTimeBasedLighting();
  setInterval(updateClock, 60000); // Update clock every minute
});

function loadData() {
  try {
    const savedEntries = localStorage.getItem('daynest_entries');
    state.entries = savedEntries ? JSON.parse(savedEntries) : [];
    migrateLegacyEntries();
    
    const savedSettings = localStorage.getItem('daynest_settings');
    if (savedSettings) {
      state.settings = JSON.parse(savedSettings);
    }
    if (!state.settings.lang) {
      state.settings.lang = 'en';
    }
  } catch (e) {
    console.error("LocalStorage load error:", e);
    state.entries = [];
  }
}

function migrateLegacyEntries() {
  let changed = false;
  state.entries.forEach(entry => {
    // v0.3 used watermelon as the first demo category. v0.4 broadens it to fruit.
    if (entry.itemType === 'watermelon') {
      entry.itemType = 'fruit';
      entry.emoji = entry.emoji || '🍎';
      changed = true;
    }
  });
  if (changed) {
    localStorage.setItem('daynest_entries', JSON.stringify(state.entries));
  }
}

function saveLocalStorage() {
  try {
    localStorage.setItem('daynest_entries', JSON.stringify(state.entries));
    localStorage.setItem('daynest_settings', JSON.stringify(state.settings));
  } catch (e) {
    console.error("LocalStorage save error:", e);
  }
}

function setupEventListeners() {
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);
  DOM.roomWindow.addEventListener('click', toggleTheme);
  DOM.soundToggleBtn.addEventListener('click', toggleSound);
  DOM.resetBtn.addEventListener('click', confirmReset);
  
  if (DOM.langToggleBtn) {
    DOM.langToggleBtn.addEventListener('click', toggleLang);
  }
  
  // Cat petting click
  DOM.catSleeping.addEventListener('click', handlePetClick);
  
  // Fridge click listeners for both closed and open states
  if (DOM.fridgeDoorClosed) {
    DOM.fridgeDoorClosed.addEventListener('click', toggleFridge);
  }
  if (DOM.fridgeDoorOpened) {
    DOM.fridgeDoorOpened.addEventListener('click', toggleFridge);
  }
  // Fallback: listen on overall fridge group
  if (!DOM.fridgeDoorClosed && !DOM.fridgeDoorOpened && DOM.roomFridge) {
    DOM.roomFridge.addEventListener('click', toggleFridge);
  }
  
  DOM.bringHomeBtn.addEventListener('click', openBringHomeModal);
  DOM.modalCloseBtn.addEventListener('click', closeModal);
  DOM.modalOverlay.addEventListener('click', (e) => {
    if (e.target === DOM.modalOverlay) closeModal();
  });
  
  const optionCards = DOM.step1.querySelectorAll('.option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      playChime('click');
      const item = card.dataset.item;
      handleItemSelection(item);
    });
  });
  
  DOM.modalBackBtn.addEventListener('click', handleModalBack);
  DOM.modalNextBtn.addEventListener('click', handleModalNext);
  DOM.modalSubmitBtn.addEventListener('click', handleModalSubmit);
  
  setupTooltipEvents();
  if (DOM.followupDismiss) DOM.followupDismiss.addEventListener('click', dismissFollowUp);
}

function applySettings() {
  if (state.settings.theme === 'night') {
    document.body.classList.add('night-mode');
    DOM.themeToggleBtn.textContent = '🌙';
  } else {
    document.body.classList.remove('night-mode');
    DOM.themeToggleBtn.textContent = '☀️';
  }
  
  if (state.settings.soundMuted) {
    DOM.soundToggleBtn.textContent = '🔇';
  } else {
    DOM.soundToggleBtn.textContent = '🔊';
  }
}

function toggleTheme() {
  playChime('click');
  const periods = ['time-morning', 'time-afternoon', 'time-evening', 'time-night'];
  const body = document.body;
  const current = periods.find(p => body.classList.contains(p)) || getDevicePeriodClass();
  const next = periods[(periods.indexOf(current) + 1) % periods.length];
  setTimePeriod(next);
}

function getDevicePeriodClass() {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 11) return 'time-morning';
  if (hour >= 11 && hour < 17) return 'time-afternoon';
  if (hour >= 17 && hour < 21) return 'time-evening';
  return 'time-night';
}

function setTimePeriod(periodClass) {
  const body = document.body;
  body.classList.remove('time-morning', 'time-afternoon', 'time-evening', 'time-night');
  body.classList.add(periodClass);
  state.settings.theme = periodClass === 'time-night' ? 'night' : 'day';
  applySettings();
  saveLocalStorage();
}

function toggleSound() {
  state.settings.soundMuted = !state.settings.soundMuted;
  if (!state.settings.soundMuted) {
    initAudio();
    applySettings();
    playChime('success');
  } else {
    applySettings();
  }
  saveLocalStorage();
}

function confirmReset() {
  playChime('click');
  const msg = translations[state.settings.lang].confirmReset;
  const confirm = window.confirm(msg);
  if (confirm) {
    state.entries = [];
    saveLocalStorage();
    renderRoom();
    renderScrapbook();
    renderFollowUp();
    playChime('night');
  }
}

// ================= LIVE CLOCK =================
function updateClock() {
  if (!DOM.clockHourHand || !DOM.clockMinuteHand) return;
  
  const now = new Date();
  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  
  // Calculate angles: 0 = 12 o'clock (pointing up, i.e. x2=0, y2=-r)
  // Minute hand: 0-59 minutes => 0-354 degrees
  const minuteDeg = (minutes / 60) * 360;
  // Hour hand: includes minute offset
  const hourDeg = ((hours + minutes / 60) / 12) * 360;
  
  // Convert to SVG line endpoint coordinates
  // The hands start at center (0,0), pointing at angle from 12 o'clock
  // At 0 deg: x2=0, y2=-length; at 90 deg: x2=length, y2=0
  const toRad = (deg) => ((deg - 90) * Math.PI) / 180;
  
  const minuteLen = 19;
  const hourLen = 13;
  
  const mx = Math.cos(toRad(minuteDeg)) * minuteLen;
  const my = Math.sin(toRad(minuteDeg)) * minuteLen;
  DOM.clockMinuteHand.setAttribute('x2', mx.toFixed(2));
  DOM.clockMinuteHand.setAttribute('y2', my.toFixed(2));
  
  const hx = Math.cos(toRad(hourDeg)) * hourLen;
  const hy = Math.sin(toRad(hourDeg)) * hourLen;
  DOM.clockHourHand.setAttribute('x2', hx.toFixed(2));
  DOM.clockHourHand.setAttribute('y2', hy.toFixed(2));
}

// ================= TIME-BASED LIGHTING =================
// Automatically sets day/night based on the device's local time
// unless the user has manually overridden it recently.
function applyTimeBasedLighting() {
  // On page load, match the user's device local time.
  // The theme button can still cycle through morning / afternoon / evening / night manually.
  setTimePeriod(getDevicePeriodClass());
}

// ================= LANGUAGE i18n ENGINE =================
function applyLang(lang) {
  state.settings.lang = lang;
  saveLocalStorage();

  const t = translations[lang];

  // Header language button text
  if (DOM.langToggleBtn) {
    DOM.langToggleBtn.textContent = lang === 'en' ? '中文' : 'EN';
  }

  // Action Button
  if (DOM.bringHomeBtn) {
    DOM.bringHomeBtn.textContent = t.bringHome;
  }

  // Scrapbook header and empty state
  const sbHeader = document.querySelector('.scrapbook-header h2');
  if (sbHeader) {
    sbHeader.textContent = t.scrapbook;
  }
  if (DOM.scrapbookEmpty) {
    DOM.scrapbookEmpty.querySelector('p').innerHTML = t.emptyPrompt;
  }

  // Modal Step 1
  const step1Subtitle = DOM.step1.querySelector('.modal-subtitle');
  if (step1Subtitle) {
    step1Subtitle.textContent = t.modalSubtitleStep1;
  }
  
  // Translate step 1 option titles
  const step1OptionTitles = DOM.step1.querySelectorAll('.option-card');
  step1OptionTitles.forEach(card => {
    const item = card.dataset.item;
    const titleEl = card.querySelector('.option-title');
    if (titleEl && outcomeData[item]) {
      const names = {
        fruit: { en: 'Fruit', zh: '水果' },
        milktea: { en: 'Milk Tea', zh: '奶茶' },
        homework: { en: 'Homework Paper', zh: '作业纸' },
        book: { en: 'A Book', zh: '一本书' },
        badmood: { en: 'A Bad Mood', zh: '坏心情' },
        custom: { en: 'Custom Item', zh: '自定义物品' }
      };
      titleEl.textContent = names[item] ? names[item][lang] : titleEl.textContent;
    }
  });

  // Modal Step 3 labels and placeholders
  const labelTitle = document.querySelector('label[for="story-title"]');
  if (labelTitle) labelTitle.textContent = t.labelTitle;
  
  const labelSummary = document.querySelector('label[for="story-summary"]');
  if (labelSummary) labelSummary.textContent = t.labelSummary;
  
  const labelTags = document.querySelector('label[for="story-tags"]');
  if (labelTags) labelTags.textContent = t.labelTags;

  if (DOM.storyTitle) DOM.storyTitle.placeholder = t.placeholderTitle;
  if (DOM.storySummary) DOM.storySummary.placeholder = t.placeholderSummary;
  if (DOM.storyTags) DOM.storyTags.placeholder = t.placeholderTags;

  // Modal buttons
  if (DOM.modalBackBtn) DOM.modalBackBtn.textContent = t.btnBack;
  if (DOM.modalNextBtn) DOM.modalNextBtn.textContent = t.btnNext;
  if (DOM.modalSubmitBtn) DOM.modalSubmitBtn.textContent = t.btnSubmit;

  // Modal Step 3 subtitle
  const step3Subtitle = DOM.step3.querySelector('.modal-subtitle');
  if (step3Subtitle) step3Subtitle.textContent = t.modalSubtitleStep3;

  // Footer text
  const footerText = document.querySelector('footer p');
  if (footerText) {
    footerText.textContent = t.footerText;
  }

  // Re-render room and scrapbook so text/tooltips/cards update appropriately
  renderRoom();
  renderScrapbook();
  renderFollowUp();
}

function toggleLang() {
  playChime('click');
  const nextLang = state.settings.lang === 'en' ? 'zh' : 'en';
  applyLang(nextLang);
}

// ================= COZY ROOM MECHANICS =================
let catBubbleTimeout = null;

function handlePetClick(e) {
  playChime('pet');
  
  DOM.catSleeping.classList.add('cat-wiggle');
  setTimeout(() => {
    DOM.catSleeping.classList.remove('cat-wiggle');
  }, 500);
  
  spawnHearts(e);
  showCatBubble();
}

function showCatBubble() {
  if (!DOM.catBubble || !DOM.catBubbleText) return;
  
  if (catBubbleTimeout) {
    clearTimeout(catBubbleTimeout);
  }
  
  const quotes = translations[state.settings.lang].catQuotes;
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  DOM.catBubbleText.textContent = quote;
  DOM.catBubble.classList.add('show-bubble');
  
  catBubbleTimeout = setTimeout(() => {
    DOM.catBubble.classList.remove('show-bubble');
  }, 3500);
}

function spawnHearts(e) {
  const panel = document.querySelector('.room-panel');
  const rect = panel.getBoundingClientRect();
  const numHearts = 3;
  
  const clickX = e ? (e.clientX - rect.left) : 380;
  const clickY = e ? (e.clientY - rect.top) : 485;
  
  for (let i = 0; i < numHearts; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart-particle';
    heart.innerHTML = '❤️';
    heart.style.left = `${clickX + (Math.random() - 0.5) * 40}px`;
    heart.style.top = `${clickY + (Math.random() - 0.5) * 30}px`;
    
    heart.style.animationDelay = `${i * 0.15}s`;
    panel.appendChild(heart);
    
    setTimeout(() => {
      heart.remove();
    }, 1200);
  }
}

function toggleFridge() {
  playChime('fridge');
  state.settings.fridgeOpen = !state.settings.fridgeOpen;
  
  if (state.settings.fridgeOpen) {
    DOM.roomFridge.classList.add('fridge-open');
  } else {
    DOM.roomFridge.classList.remove('fridge-open');
  }
  saveLocalStorage();
}

// ================= REFLECTION MODAL FLOW ENGINE =================

function openBringHomeModal() {
  playChime('click');
  
  state.modal.currentStep = 1;
  state.modal.selectedItem = null;
  state.modal.selectedOutcome = null;
  state.modal.customName = '';
  state.modal.customPlacement = null;
  state.modal.title = '';
  state.modal.summary = '';
  state.modal.tags = '';
  
  DOM.step1.style.display = 'block';
  DOM.step2.style.display = 'none';
  DOM.step3.style.display = 'none';
  
  DOM.modalBackBtn.style.visibility = 'hidden';
  DOM.modalNextBtn.style.display = 'none';
  DOM.modalSubmitBtn.style.display = 'none';
  DOM.modalTitle.textContent = translations[state.settings.lang].modalTitleStep1;
  
  DOM.modalOverlay.classList.add('show');
}

function closeModal() {
  playChime('click');
  DOM.modalOverlay.classList.remove('show');
}

function handleItemSelection(item) {
  state.modal.selectedItem = item;
  
  if (item === 'custom') {
    const promptMsg = translations[state.settings.lang].customPrompt;
    const inputName = window.prompt(promptMsg);
    if (!inputName || inputName.trim() === "") {
      return;
    }
    state.modal.customName = inputName.trim();
  }
  
  goToStep(2);
}

function goToStep(step) {
  state.modal.currentStep = step;
  
  DOM.step1.style.display = 'none';
  DOM.step2.style.display = 'none';
  DOM.step3.style.display = 'none';
  
  DOM.modalBackBtn.style.visibility = 'visible';
  DOM.modalNextBtn.style.display = 'none';
  DOM.modalSubmitBtn.style.display = 'none';
  
  const lang = state.settings.lang || 'en';
  
  if (step === 1) {
    DOM.step1.style.display = 'block';
    DOM.modalBackBtn.style.visibility = 'hidden';
    DOM.modalTitle.textContent = translations[lang].modalTitleStep1;
  } 
  else if (step === 2) {
    renderStep2Options();
    DOM.step2.style.display = 'block';
    const itemName = lang === 'zh' ? outcomeData[state.modal.selectedItem].nameZh : outcomeData[state.modal.selectedItem].name;
    DOM.modalTitle.textContent = translations[lang].modalTitleStep2.replace('{name}', itemName);
  } 
  else if (step === 3) {
    fillStep3Defaults();
    DOM.step3.style.display = 'block';
    DOM.modalSubmitBtn.style.display = 'inline-block';
    DOM.modalTitle.textContent = translations[lang].btnSubmit.replace(' 🏡', '');
  }
}

function renderStep2Options() {
  const item = state.modal.selectedItem;
  const itemConfig = outcomeData[item];
  const lang = state.settings.lang || 'en';
  
  let subtitle = lang === 'zh' ? translations.zh.step2SubtitleItem : translations.en.step2SubtitleItem;
  if (item === 'custom') {
    subtitle = (lang === 'zh' ? translations.zh.step2SubtitleCustom : translations.en.step2SubtitleCustom).replace('{name}', state.modal.customName);
  }
  
  let optionsHtml = `<p class="modal-subtitle">${subtitle}</p><br><div class="reflection-options">`;
  itemConfig.options.forEach(opt => {
    const optText = lang === 'zh' ? opt.textZh : opt.text;
    optionsHtml += `
      <button class="option-card" data-outcome="${opt.id}">
        <span class="option-emoji">${itemConfig.emoji}</span>
        <span class="option-title">${optText}</span>
      </button>
    `;
  });
  optionsHtml += `</div>`;
  DOM.step2.innerHTML = optionsHtml;
  
  const cards = DOM.step2.querySelectorAll('.option-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      playChime('click');
      state.modal.selectedOutcome = card.dataset.outcome;
      if (item === 'custom') {
        state.modal.customPlacement = card.dataset.outcome;
      }
      goToStep(3);
    });
  });
}

function fillStep3Defaults() {
  const item = state.modal.selectedItem;
  const outcome = state.modal.selectedOutcome;
  const itemConfig = outcomeData[item];
  const lang = state.settings.lang || 'en';
  let defaults = {};
  
  if (item === 'custom') {
    const name = state.modal.customName;
    const opt = itemConfig.options.find(o => o.id === outcome);
    const placementText = lang === 'zh' ? opt.textZh : opt.text.toLowerCase();
    if (lang === 'zh') {
      defaults = {
        title: translations.zh.customDefaultTitle.replace('{name}', name),
        summary: translations.zh.customDefaultSummary.replace('{name}', name).replace('{placementText}', placementText),
        tags: translations.zh.customDefaultTags.replace('{name}', name)
      };
    } else {
      defaults = {
        title: translations.en.customDefaultTitle.replace('{name}', name),
        summary: translations.en.customDefaultSummary.replace('{name}', name).replace('{placementText}', placementText),
        tags: translations.en.customDefaultTags.replace('{name}', name)
      };
    }
  } else {
    const rawDefaults = itemConfig.defaults[outcome];
    defaults = {
      title: lang === 'zh' ? rawDefaults.titleZh : rawDefaults.title,
      summary: lang === 'zh' ? rawDefaults.summaryZh : rawDefaults.summary,
      tags: lang === 'zh' ? rawDefaults.tagsZh : rawDefaults.tags
    };
  }
  
  DOM.storyTitle.value = defaults.title;
  DOM.storySummary.value = defaults.summary;
  DOM.storyTags.value = defaults.tags;
}

function handleModalBack() {
  playChime('click');
  goToStep(state.modal.currentStep - 1);
}

function handleModalNext() {
  playChime('click');
  goToStep(state.modal.currentStep + 1);
}

function handleModalSubmit() {
  const title = DOM.storyTitle.value.trim() || 'A Quiet Moment';
  const summary = DOM.storySummary.value.trim() || 'A calm day spent thinking about simple moments.';
  const tagsStr = DOM.storyTags.value.trim() || '#cozy, #nest';
  
  const tags = tagsStr.split(',')
                      .map(t => t.trim())
                      .filter(t => t !== "")
                      .map(t => t.startsWith('#') ? t : `#${t}`);
                      
  const lang = state.settings.lang || 'en';
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
  const dateOptions = { month: 'long', day: 'numeric', weekday: 'long' };
  const today = new Date();
  const dateString = today.toLocaleDateString(locale, dateOptions);
  
  const entry = {
    id: Date.now(),
    dateString,
    itemType: state.modal.selectedItem,
    outcome: state.modal.selectedOutcome,
    emoji: outcomeData[state.modal.selectedItem].emoji,
    customName: state.modal.customName,
    customPlacement: state.modal.customPlacement,
    title,
    summary,
    tags
  };
  
  state.entries.push(entry);
  saveLocalStorage();
  
  renderRoom();
  renderScrapbook();
  renderFollowUp();
  playChime('success');
  spawnHearts(null);
  
  // Trigger Pop Animation on nestled item
  let targetClass = '';
  if (entry.itemType === 'custom') {
    targetClass = `room-custom-${entry.customPlacement}`;
  } else {
    const config = outcomeData[entry.itemType];
    const selectedOption = config.options.find(o => o.id === entry.outcome);
    if (selectedOption) {
      targetClass = selectedOption.class;
    }
  }
  const svgEl = document.getElementById(targetClass);
  if (svgEl) {
    svgEl.classList.add('item-pop');
    setTimeout(() => {
      svgEl.classList.remove('item-pop');
    }, 850);
  }

  // Display Toast message
  const toasts = translations[lang].toasts;
  const toastMsg = toasts[Math.floor(Math.random() * toasts.length)];
  showToast(toastMsg);
  
  DOM.modalOverlay.classList.remove('show');
}

function showToast(message) {
  let toast = document.getElementById('cozy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cozy-toast';
    toast.className = 'memory-toast';
    DOM.roomWrapper.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ================= RENDER LOGIC =================

function renderRoom() {
  // Sync fridge door open state class
  if (state.settings.fridgeOpen) {
    DOM.roomFridge.classList.add('fridge-open');
  } else {
    DOM.roomFridge.classList.remove('fridge-open');
  }

  // Reset standard room items
  const allRoomItems = DOM.roomSvg.querySelectorAll('.room-item');
  allRoomItems.forEach(item => item.classList.remove('item-active'));
  
  // Determine standard active items
  const activeItems = {
    fruit: null,
    milktea: null,
    homework: null,
    book: null,
    badmood: null
  };
  
  for (let i = state.entries.length - 1; i >= 0; i--) {
    const entry = state.entries[i];
    if (activeItems[entry.itemType] === null) {
      activeItems[entry.itemType] = entry;
    }
  }
  
  // Toggle standard items visible
  Object.keys(activeItems).forEach(itemType => {
    const activeEntry = activeItems[itemType];
    if (activeEntry) {
      const config = outcomeData[itemType];
      const selectedOption = config.options.find(o => o.id === activeEntry.outcome);
      if (selectedOption) {
        const svgEl = document.getElementById(selectedOption.class);
        if (svgEl) {
          svgEl.classList.add('item-active');
          const display = getEntryDisplay(activeEntry);
          svgEl.setAttribute('data-tooltip-title', display.label || display.title);
          svgEl.setAttribute('data-tooltip-desc', display.summary);
          svgEl.setAttribute('data-entry-id', activeEntry.id);
        }
      }
    }
  });
  
  // Custom item placements: room shows the latest state for each placement, not a pile of old objects
  const latestCustomByPlacement = { desk: null, table: null, pet: null, rug: null, float: null };
  for (let i = state.entries.length - 1; i >= 0; i--) {
    const entry = state.entries[i];
    if (entry.itemType === 'custom' && latestCustomByPlacement[entry.customPlacement] === null) {
      latestCustomByPlacement[entry.customPlacement] = entry;
    }
  }
  
  Object.keys(latestCustomByPlacement).forEach(placement => {
    const entry = latestCustomByPlacement[placement];
    const svgEl = document.getElementById(`room-custom-${placement}`);
    if (svgEl) {
      if (entry) {
        svgEl.classList.add('item-active');
        const lang = state.settings.lang || 'en';
        svgEl.setAttribute('data-tooltip-title', lang === 'zh' ? '自定义小物' : 'Custom Item');
        svgEl.setAttribute('data-tooltip-desc', entry.customName || '');
        svgEl.setAttribute('data-entry-id', entry.id);
      } else {
        svgEl.classList.remove('item-active');
      }
    }
  });

  renderMemoryShelfTokens();
}

function renderMemoryShelfTokens() {
  const tokens = [...DOM.roomSvg.querySelectorAll('.shelf-token')];
  tokens.forEach(token => {
    token.classList.remove('item-active');
    token.removeAttribute('data-tooltip-title');
    token.removeAttribute('data-tooltip-desc');
    token.removeAttribute('data-entry-id');
  });

  const recentEntries = state.entries.slice(-5).reverse();
  recentEntries.forEach((entry, index) => {
    const token = document.getElementById(`shelf-token-${index}`);
    if (!token) return;
    const display = getEntryDisplay(entry);
    const emojiEl = token.querySelector('.shelf-token-emoji');
    if (emojiEl) emojiEl.textContent = getMemoryTokenEmoji(entry);
    token.classList.add('item-active');
    token.setAttribute('data-tooltip-title', display.title);
    token.setAttribute('data-tooltip-desc', display.dateString);
    token.setAttribute('data-entry-id', entry.id);
  });
}

function getMemoryTokenEmoji(entry) {
  const map = {
    fruit: '🍎',
    milktea: '🥤',
    homework: '📝',
    book: '📖',
    badmood: '☁️',
    custom: '✨'
  };
  return map[entry.itemType] || entry.emoji || '✨';
}

function getEntryDisplay(entry, lang = state.settings.lang || 'en') {
  const locale = lang === 'zh' ? 'zh-CN' : 'en-US';
  const dateOptions = { month: 'long', day: 'numeric', weekday: 'long' };
  const dateString = new Date(entry.id || Date.now()).toLocaleDateString(locale, dateOptions);

  if (entry.itemType !== 'custom' && outcomeData[entry.itemType]) {
    const defaults = outcomeData[entry.itemType].defaults?.[entry.outcome];
    const opt = outcomeData[entry.itemType].options?.find(o => o.id === entry.outcome);
    if (defaults) {
      return {
        title: lang === 'zh' ? (defaults.titleZh || defaults.title) : defaults.title,
        summary: lang === 'zh' ? (defaults.summaryZh || defaults.summary) : defaults.summary,
        tags: (lang === 'zh' ? (defaults.tagsZh || defaults.tags) : defaults.tags)
          .split(',').map(t => t.trim()).filter(Boolean),
        label: lang === 'zh' ? (opt?.labelZh || opt?.label || defaults.title) : (opt?.label || defaults.title),
        dateString
      };
    }
  }

  return {
    title: entry.title,
    summary: entry.summary,
    tags: entry.tags || [],
    label: entry.customName || entry.title,
    dateString
  };
}

function renderFollowUp() {
  if (!DOM.followupCard || !DOM.followupOptions) return;

  const lang = state.settings.lang || 'en';
  const t = translations[lang];
  const entry = getYesterdayEntryWithoutFollowUp();

  if (!entry) {
    DOM.followupCard.style.display = 'none';
    return;
  }

  DOM.followupCard.style.display = 'block';
  const kicker = DOM.followupCard.querySelector('.followup-kicker');
  if (kicker) kicker.textContent = t.followupKicker;
  DOM.followupTitle.textContent = t.followupTitle;
  DOM.followupSubtitle.textContent = t.followupSubtitle;
  DOM.followupDismiss.textContent = t.followupDismiss;

  DOM.followupOptions.innerHTML = '';
  const options = getFollowUpOptions(entry.itemType, lang);
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'followup-option';
    btn.type = 'button';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => saveFollowUp(entry.id, opt));
    DOM.followupOptions.appendChild(btn);
  });
}

function getYesterdayEntryWithoutFollowUp() {
  const today = new Date();
  const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
  const yStart = yesterday.getTime();
  const yEnd = yStart + 24 * 60 * 60 * 1000;

  for (let i = state.entries.length - 1; i >= 0; i--) {
    const entry = state.entries[i];
    const time = Number(entry.id);
    if (time >= yStart && time < yEnd && !entry.followUp && !entry.followUpDismissed) {
      return entry;
    }
  }
  return null;
}

function getFollowUpOptions(itemType, lang) {
  const data = {
    fruit: {
      en: ['ate it', 'put it in the fridge', 'shared it', 'saved it for later', 'it was enough to remember it'],
      zh: ['吃完了', '放进冰箱了', '和人分享了', '留给之后了', '记得它就已经足够了']
    },
    book: {
      en: ['read a little more', 'left it on the desk', 'finished it', 'lent it to someone', 'not today, and that is okay'],
      zh: ['又读了一点', '还放在书桌上', '读完了', '借给别人了', '今天没看，也没关系']
    },
    milktea: {
      en: ['finished it', 'saved it', 'threw away the empty cup', 'forgot about it', 'it was just a sweet moment'],
      zh: ['喝完了', '留起来了', '把空杯子扔掉了', '忘记它了', '它只是一个甜甜的瞬间']
    },
    badmood: {
      en: ['felt a bit better', 'still feeling it', 'slept it off', 'talked to someone', 'let it pass slowly'],
      zh: ['感觉好一点了', '还在难过', '睡了一觉', '和人聊了聊', '让它慢慢过去']
    },
    homework: {
      en: ['finished it', 'continued it', 'put it away', 'ignored it for rest', 'made a tiny bit of progress'],
      zh: ['做完了', '继续做了一点', '收起来了', '为了休息先不管了', '有一点点进展']
    },
    custom: {
      en: ['kept it nearby', 'put it away', 'shared it', 'forgot it for now', 'it stayed as a small trace'],
      zh: ['还放在身边', '收起来了', '分享了它', '暂时忘记了', '它留成了一个小痕迹']
    }
  };
  return (data[itemType] || data.custom)[lang].map(text => ({ text, textZh: text }));
}

function saveFollowUp(entryId, option) {
  const lang = state.settings.lang || 'en';
  const entry = state.entries.find(e => e.id === entryId);
  if (!entry) return;
  entry.followUp = {
    text: option.text,
    lang,
    savedAt: Date.now()
  };
  saveLocalStorage();
  renderScrapbook();
  renderFollowUp();
  showMemoryToast(translations[lang].followupSaved);
}

function dismissFollowUp() {
  const entry = getYesterdayEntryWithoutFollowUp();
  if (!entry) return;
  entry.followUpDismissed = true;
  saveLocalStorage();
  renderFollowUp();
}

function renderScrapbook() {
  const listContainer = DOM.scrapbookList;
  const existingCards = listContainer.querySelectorAll('.polaroid-card');
  existingCards.forEach(card => card.remove());
  
  const lang = state.settings.lang || 'en';
  if (lang === 'zh') {
    DOM.scrapbookCount.textContent = `${state.entries.length} ${translations.zh.nestMemories}`;
  } else {
    DOM.scrapbookCount.textContent = `${state.entries.length} ${state.entries.length === 1 ? translations.en.nestMemory : translations.en.nestMemories}`;
  }
  
  if (state.entries.length === 0) {
    DOM.scrapbookEmpty.style.display = 'flex';
    return;
  }
  DOM.scrapbookEmpty.style.display = 'none';
  
  state.entries.slice().reverse().forEach((entry) => {
    const display = getEntryDisplay(entry, lang);
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    const randomRotation = (Math.random() - 0.5) * 4;
    card.style.setProperty('--rotation', `${randomRotation}deg`);
    
    let tagsHtml = '';
    display.tags.forEach(tag => {
      tagsHtml += `<span class="tag-pill">${tag}</span>`;
    });
    
    const deleteTitle = lang === 'zh' ? '删除记忆' : 'Remove memory';
    
    card.innerHTML = `
      <div class="polaroid-header">
        <span class="polaroid-date">${display.dateString}</span>
        <button class="btn-delete" data-id="${entry.id}" title="${deleteTitle}" aria-label="${deleteTitle}">✕</button>
      </div>
      <div class="polaroid-body">
        <div class="polaroid-thumbnail" aria-hidden="true">${entry.emoji}</div>
        <div class="polaroid-text">
          <h4 class="polaroid-title">${escapeHtml(display.title)}</h4>
          <p class="polaroid-desc">${escapeHtml(display.summary)}</p>
          ${entry.followUp ? `<p class="polaroid-followup">↳ ${escapeHtml(entry.followUp.text)}</p>` : ``}
          <div class="polaroid-tags">${tagsHtml}</div>
        </div>
      </div>
    `;
    
    const deleteBtn = card.querySelector('.btn-delete');
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleDeleteEntry(entry.id);
    });
    
    card.addEventListener('click', () => {
      highlightRoomObjectForEntry(entry);
    });
    
    listContainer.appendChild(card);
  });
}

function highlightRoomObjectForEntry(entry) {
  playChime('click');
  let targetClass = '';
  if (entry.itemType === 'custom') {
    targetClass = `room-custom-${entry.customPlacement}`;
  } else {
    const config = outcomeData[entry.itemType];
    const selectedOption = config.options.find(o => o.id === entry.outcome);
    if (selectedOption) {
      targetClass = selectedOption.class;
    }
  }
  
  const element = document.getElementById(targetClass);
  if (element && element.classList.contains('item-active')) {
    element.style.transition = 'transform 0.2s ease, filter 0.2s ease';
    element.style.transform = 'scale(1.2)';
    element.style.filter = 'brightness(1.3) drop-shadow(0px 0px 10px rgba(255,220,100,0.8))';
    
    const display = getEntryDisplay(entry);
    showTooltip(element, `${entry.emoji} ${display.title}`);
    
    setTimeout(() => {
      element.style.transform = '';
      element.style.filter = '';
      hideTooltip();
    }, 1500);
  }
}

function handleDeleteEntry(id) {
  playChime('click');
  const confirm = window.confirm(translations[state.settings.lang || 'en'].confirmDelete);
  if (confirm) {
    state.entries = state.entries.filter(e => e.id !== id);
    saveLocalStorage();
    renderRoom();
    renderScrapbook();
    renderFollowUp();
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ================= INTERACTIVE ROOM MOUSE TOOLTIPS =================

function setupTooltipEvents() {
  DOM.roomSvg.addEventListener('mouseover', (e) => {
    let target = e.target;
    while (target && target !== DOM.roomSvg) {
      if (target.classList && ((target.classList.contains('room-item') || target.classList.contains('shelf-token')) && target.classList.contains('item-active'))) {
        const title = target.getAttribute('data-tooltip-title') || (state.settings.lang === 'zh' ? '小物件' : 'Cozy Object');
        const desc = target.getAttribute('data-tooltip-desc') || '';
        showTooltip(target, desc ? `${title} - ${desc}` : title);
        break;
      }
      if (target.getAttribute && (target.getAttribute('data-room-tooltip-en') || target.getAttribute('data-room-tooltip-zh'))) {
        const lang = state.settings.lang || 'en';
        const label = lang === 'zh'
          ? (target.getAttribute('data-room-tooltip-zh') || target.getAttribute('data-room-tooltip-en'))
          : (target.getAttribute('data-room-tooltip-en') || target.getAttribute('data-room-tooltip-zh'));
        showTooltip(target, label);
        break;
      }
      target = target.parentNode;
    }
  });

  DOM.roomSvg.addEventListener('mouseout', (e) => {
    let target = e.target;
    while (target && target !== DOM.roomSvg) {
      if ((target.classList && (target.classList.contains('room-item') || target.classList.contains('shelf-token'))) ||
          (target.getAttribute && (target.getAttribute('data-room-tooltip-en') || target.getAttribute('data-room-tooltip-zh')))) {
        hideTooltip();
        break;
      }
      target = target.parentNode;
    }
  });

  DOM.roomSvg.addEventListener('click', (e) => {
    let target = e.target;
    while (target && target !== DOM.roomSvg) {
      if (target.classList && ((target.classList.contains('room-item') || target.classList.contains('shelf-token')) && target.classList.contains('item-active'))) {
        const entryId = target.getAttribute('data-entry-id');
        if (entryId) {
          highlightScrapbookCard(Number(entryId));
        }
        break;
      }
      target = target.parentNode;
    }
  });
}

function showTooltip(el, text) {
  if (text.length > 50) {
    text = text.substring(0, 47) + '...';
  }
  
  DOM.roomTooltip.querySelector('span').textContent = text;
  DOM.roomTooltip.style.display = 'block';
  
  const elRect = el.getBoundingClientRect();
  const wrapRect = DOM.roomWrapper.getBoundingClientRect();
  
  const left = (elRect.left - wrapRect.left) + (elRect.width / 2) - (DOM.roomTooltip.offsetWidth / 2);
  const top = (elRect.top - wrapRect.top) - DOM.roomTooltip.offsetHeight - 10;
  
  DOM.roomTooltip.style.left = `${left}px`;
  DOM.roomTooltip.style.top = `${top}px`;
}

function hideTooltip() {
  DOM.roomTooltip.style.display = 'none';
}

function highlightScrapbookCard(entryId) {
  const cards = DOM.scrapbookList.querySelectorAll('.polaroid-card');
  let targetCard = null;
  
  cards.forEach(card => {
    const deleteBtn = card.querySelector('.btn-delete');
    if (deleteBtn && Number(deleteBtn.dataset.id) === entryId) {
      targetCard = card;
    }
  });
  
  if (targetCard) {
    targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    targetCard.style.transform = 'scale(1.05) rotate(0deg)';
    targetCard.style.boxShadow = '0 12px 30px rgba(255, 139, 123, 0.35)';
    targetCard.style.border = '2.5px solid var(--accent)';
    playChime('click');
    
    setTimeout(() => {
      targetCard.style.transform = '';
      targetCard.style.boxShadow = '';
      targetCard.style.border = '';
    }, 1500);
  }
}
