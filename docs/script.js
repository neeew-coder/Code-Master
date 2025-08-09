document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('nameInput');
  const taglineInput = document.getElementById('taglineInput');
  const avatarInput = document.getElementById('avatarInput');
  const createBtn = document.getElementById('createProfileBtn');

  const profileForm = document.getElementById('profileForm');
  const profileDisplay = document.getElementById('profileDisplay');
  const profileName = document.getElementById('profileName');
  const profileTagline = document.getElementById('profileTagline');
  const profileAvatar = document.getElementById('profileAvatar');
  const editBtn = document.getElementById('editProfileBtn');

  const progressFill = document.getElementById('progressFill');
  const badgeList = document.getElementById('badgeList');

  // Load saved profile
  const saved = JSON.parse(localStorage.getItem('userProfile'));
  if (saved) {
    showProfile(saved.name, saved.tagline, saved.avatar, saved.progress || 0, saved.badges || []);
  }

  createBtn.addEventListener('click', () => {
    const name = nameInput.value.trim();
    const tagline = taglineInput.value.trim();
    const avatar = avatarInput.value.trim();

    if (!name || !tagline || !avatar) {
      alert('Please fill out all fields.');
      return;
    }

    const profile = {
      name,
      tagline,
      avatar,
      progress: 65, // You can calculate this dynamically
      badges: ['JavaScript Pro', 'C# Explorer', 'Docker Master']
    };

    localStorage.setItem('userProfile', JSON.stringify(profile));
    showProfile(profile.name, profile.tagline, profile.avatar, profile.progress, profile.badges);
  });

  editBtn.addEventListener('click', () => {
    const saved = JSON.parse(localStorage.getItem('userProfile'));
    nameInput.value = saved.name;
    taglineInput.value = saved.tagline;
    avatarInput.value = saved.avatar;

    profileDisplay.classList.add('hidden');
    profileForm.classList.remove('hidden');
  });

  function showProfile(name, tagline, avatar, progress = 0, badges = []) {
    profileName.textContent = name;
    profileTagline.textContent = tagline;
    profileAvatar.src = avatar;

    // Progress bar
    progressFill.style.width = `${progress}%`;

    // Badges
    badgeList.innerHTML = '';
    badges.forEach(badge => {
      const span = document.createElement('span');
      span.className = 'badge';
      span.textContent = badge;
      badgeList.appendChild(span);
    });

    profileForm.classList.add('hidden');
    profileDisplay.classList.remove('hidden');
  }
});