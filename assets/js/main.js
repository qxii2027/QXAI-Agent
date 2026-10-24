(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const gsap = window.gsap
  const ScrollTrigger = window.ScrollTrigger

  // Copy-to-clipboard works even if the animation library fails to load.
  const copyButtons = document.querySelectorAll('[data-copy]')
  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.getAttribute('data-copy') || ''
      const original = button.textContent
      try {
        await navigator.clipboard.writeText(value)
      } catch {
        const area = document.createElement('textarea')
        area.value = value
        area.style.position = 'fixed'
        area.style.opacity = '0'
        document.body.appendChild(area)
        area.select()
        document.execCommand('copy')
        area.remove()
      }
      button.textContent = '已复制'
      window.setTimeout(() => {
        button.textContent = original
      }, 1500)
    })
  })

  if (!gsap || !ScrollTrigger) return
  gsap.registerPlugin(ScrollTrigger)
  gsap.defaults({ ease: 'power3.out' })
  ScrollTrigger.config({ ignoreMobileResize: true })
  window.addEventListener('load', () => ScrollTrigger.refresh())

  /* ---------- hero ---------- */

  if (!reduceMotion) {
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
    intro
      .from('.hero .eyebrow', { y: 14, opacity: 0, duration: 0.6 })
      .from(
        '.hero-title .line > span',
        { yPercent: 112, duration: 1.05, stagger: 0.085 },
        '-=0.25'
      )
      .from('.hero .lede', { y: 18, opacity: 0, duration: 0.75 }, '-=0.6')
      .from('.hero .actions', { y: 14, opacity: 0, duration: 0.65 }, '-=0.55')
      .from('.hero .hint', { y: 10, opacity: 0, duration: 0.5 }, '-=0.5')
      .from('.hero-art', { y: 30, opacity: 0, duration: 1.1 }, '-=0.95')
      .from('.hero-pet', { y: 36, opacity: 0, duration: 0.8 }, '-=0.65')

    gsap.to('.hero-pet', {
      y: '-=11',
      rotate: 1.3,
      duration: 3.6,
      delay: 1.4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    })

    // Gentle pointer parallax on the framed screenshot and the pet.
    const hero = document.querySelector('.hero')
    const frame = document.querySelector('.hero-frame')
    const pet = document.querySelector('.hero-pet')
    if (hero && frame && pet && window.matchMedia('(pointer: fine)').matches) {
      const frameX = gsap.quickTo(frame, 'x', { duration: 0.8, ease: 'power2.out' })
      const frameY = gsap.quickTo(frame, 'y', { duration: 0.8, ease: 'power2.out' })
      const petX = gsap.quickTo(pet, 'x', { duration: 1.1, ease: 'power2.out' })
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect()
        const nx = (event.clientX - rect.left) / rect.width - 0.5
        const ny = (event.clientY - rect.top) / rect.height - 0.5
        frameX(nx * 7)
        frameY(ny * 5)
        petX(nx * -10)
      })
      hero.addEventListener('pointerleave', () => {
        frameX(0)
        frameY(0)
        petX(0)
      })
    }

    gsap.to('.hero-pet', {
      yPercent: 8,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6
      }
    })

    // Small magnetic pull on the primary calls to action.
    if (window.matchMedia('(pointer: fine)').matches) {
      document.querySelectorAll('.btn-primary, .btn-outline').forEach((button) => {
        const xTo = gsap.quickTo(button, 'x', { duration: 0.35, ease: 'power2.out' })
        const yTo = gsap.quickTo(button, 'y', { duration: 0.35, ease: 'power2.out' })
        button.addEventListener('pointermove', (event) => {
          const rect = button.getBoundingClientRect()
          xTo(((event.clientX - rect.left) / rect.width - 0.5) * 5)
          yTo(((event.clientY - rect.top) / rect.height - 0.5) * 4)
        })
        button.addEventListener('pointerleave', () => {
          xTo(0)
          yTo(0)
        })
      })
    }
  }

  /* ---------- scroll progress ---------- */

  gsap.to('.scroll-progress span', {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.25
    }
  })

  /* ---------- section reveals ---------- */

  if (!reduceMotion) {
    gsap.utils.toArray('.reveal').forEach((element) => {
      if (element.closest('.hero')) return
      gsap.from(element, {
        y: 26,
        opacity: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: element,
          start: 'top 88%',
          once: true
        }
      })
    })
  }

  /* ---------- feature rows + sticky stage ---------- */

  const rows = Array.from(document.querySelectorAll('.feature-row'))
  const stageImages = Array.from(document.querySelectorAll('.stage-img'))
  const stageCaption = document.querySelector('[data-stage-caption]')
  const stageFrame = document.querySelector('.stage-frame')
  const stageKinds = ['shot', 'bar', 'portrait', 'shot', 'shot']
  const captions = [
    '悬浮窗 · Alt+Q 唤起',
    '灵动岛胶囊 · 收起时保留进度',
    'Kipfel · 表情与动作由你挑',
    'MCP · 每个工具调用先确认',
    '本机存储 · 密钥由 DPAPI 加密'
  ]
  let active = 0

  const showStage = (index) => {
    rows.forEach((row, i) => row.classList.toggle('is-active', i === index))
    if (index !== active) {
      stageImages.forEach((image, i) => image.classList.toggle('is-shown', i === index))
      if (stageFrame) stageFrame.dataset.kind = stageKinds[index] || 'shot'
      if (stageCaption) stageCaption.textContent = captions[index] || ''
      if (stageFrame) stageFrame.dataset.kind = stageKinds[index] || 'shot'
      active = index
    }
  }

  rows.forEach((row, index) => {
    ScrollTrigger.create({
      trigger: row,
      start: 'top 58%',
      end: 'bottom 58%',
      onEnter: () => showStage(index),
      onEnterBack: () => showStage(index)
    })
    row.addEventListener('pointerenter', () => showStage(index))
  })

  /* ---------- images fade in when decoded ---------- */

  document.querySelectorAll('.stage-img, .hero-frame img').forEach((image) => {
    if (image.complete) return
    image.style.opacity = image.classList.contains('is-shown') ? '' : '0'
    image.addEventListener(
      'load',
      () => {
        image.style.opacity = ''
        ScrollTrigger.refresh()
      },
      { once: true }
    )
  })
})()
