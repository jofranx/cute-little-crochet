/**
 * Cute Little Crochet - Boutique Web Storefront & WhatsApp Order Portal
 * With Supabase Cloud Database, Cloud Photo Storage & Secure Owner Authentication
 */

// Initial Seed Products (Used for initial setup or offline demo mode)
const DEFAULT_PRODUCTS = [
  {
    id: 'clc-1',
    name: 'Daisy Meadow Slouchy Tote Bag',
    category: 'bags',
    price: 1199,
    originalPrice: 1499,
    badge: 'ready',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop',
    description: 'A breezy, aesthetic shoulder bag handcrafted from individual granny squares with cheerful daisies. Spacious enough for a book, wallet, keys, and your daily essentials.',
    dimensions: '32 cm x 30 cm (Drop length: 26 cm)',
    yarn: '100% Breathable Milk Cotton Yarn',
    care: 'Gentle hand wash with cold water, lay flat to dry in shade'
  },
  {
    id: 'clc-2',
    name: 'Strawberry Bunny Amigurumi Plushie',
    category: 'plushies',
    price: 649,
    originalPrice: null,
    badge: 'ready',
    image: 'https://images.unsplash.com/photo-1559715745-e1b123c5c407?q=80&w=800&auto=format&fit=crop',
    description: 'Super soft pocket-sized plush bunny wearing a tiny strawberry beret. Stuffed with hypoallergenic polyester fiberfill and fitted with safety eyes.',
    dimensions: '18 cm tall (including floppy ears)',
    yarn: 'Extra Soft Baby Cotton Blend',
    care: 'Spot clean only with a damp cloth'
  },
  {
    id: 'clc-3',
    name: 'Pastel Checkered Bucket Hat',
    category: 'wearables',
    price: 849,
    originalPrice: 1099,
    badge: 'custom',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=800&auto=format&fit=crop',
    description: 'A trendy cottagecore bucket hat woven in soft lilac and cream checkerboard pattern. Lightweight, cozy, and perfectly styled for sunny afternoons.',
    dimensions: 'Standard Adult Fit (Head circumference 54-58 cm)',
    yarn: '100% Breathable Organic Cotton',
    care: 'Hand wash cold, reshape and dry flat'
  },
  {
    id: 'clc-4',
    name: 'Cozy Daisy Bloom Coaster Set (Pack of 4)',
    category: 'home',
    price: 449,
    originalPrice: 599,
    badge: 'ready',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop',
    description: 'Brighten your morning chai or coffee! Set of 4 handmade floral mug rugs that absorb heat and tabletop moisture with vibrant petals.',
    dimensions: '12 cm diameter per coaster',
    yarn: 'Durable Double-strand Cotton',
    care: 'Machine washable on gentle cycle inside a laundry mesh bag'
  },
  {
    id: 'clc-5',
    name: 'Handcrafted Granny Square Cardigan',
    category: 'wearables',
    price: 2899,
    originalPrice: 3499,
    badge: 'custom',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop',
    description: 'Our signature statement piece! Over 50 unique hand-stitched floral squares joined into a cozy, oversized cardigan with ribbed cuffs and horn buttons.',
    dimensions: 'Free size (Oversized fit, chest up to 44 inches)',
    yarn: 'Premium Milk Cotton & Acrylic Blend',
    care: 'Dry clean recommended or hand wash with mild wool wash detergent'
  },
  {
    id: 'clc-6',
    name: 'Matcha Turtle Desk Amigurumi',
    category: 'plushies',
    price: 549,
    originalPrice: null,
    badge: 'ready',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop',
    description: 'A charming little turtle with a spiral matcha-green shell to keep you company on your study desk or office setup. Guaranteed to bring instant smile!',
    dimensions: '14 cm length x 8 cm height',
    yarn: '100% Milk Cotton',
    care: 'Spot clean with mild soapy water'
  },
  {
    id: 'clc-7',
    name: 'Ruffled Cottagecore Scrunchie Duo',
    category: 'accessories',
    price: 299,
    originalPrice: null,
    badge: 'ready',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=800&auto=format&fit=crop',
    description: 'Set of two voluminous ruffled crochet scrunchies in Dusty Rose and Cream. Gentle on hair strands with zero snagging or breakage.',
    dimensions: '11 cm outer diameter (stretches up to 20 cm)',
    yarn: 'Silky Soft Microfiber Cotton',
    care: 'Quick hand rinse, air dry'
  },
  {
    id: 'clc-8',
    name: 'Blooming Tulip Flower Pot Desk Buddy',
    category: 'home',
    price: 499,
    originalPrice: null,
    badge: 'sold',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=800&auto=format&fit=crop',
    description: 'A potted crochet tulip that never withers! Hand-wired stem allows you to bend and adjust the blossom angle.',
    dimensions: '16 cm total height',
    yarn: 'Cotton Yarn with weighted base',
    care: 'Gently dust with a soft brush'
  }
];

const DEFAULT_SETTINGS = {
  whatsapp: (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.DEFAULT_WHATSAPP) ? APP_CONFIG.DEFAULT_WHATSAPP : '918197477497',
  upi: (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.DEFAULT_UPI) ? APP_CONFIG.DEFAULT_UPI : 'cutelittlecrochet@okhdfcbank',
  announcement: (typeof APP_CONFIG !== 'undefined' && APP_CONFIG.DEFAULT_ANNOUNCEMENT) ? APP_CONFIG.DEFAULT_ANNOUNCEMENT : 'Handmade with 100% love in India 🇮🇳 • Free shipping on orders above ₹1,200!',
  pin: '1234'
};

// Global State
const state = {
  products: [],
  cart: [],
  settings: {},
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'featured',
  selectedProduct: null
};

// Supabase Client Reference & Auth State
let supabaseClient = null;
let currentAuthUser = null;
let uploadedImageFile = null;
let uploadedImageBase64 = null;
let editUploadedImageFile = null;
let editUploadedImageBase64 = null;

// ==================== SUPABASE INITIALIZATION ====================

function initSupabase() {
  const storedUrl = localStorage.getItem('clc_supabase_url');
  const storedKey = localStorage.getItem('clc_supabase_anon_key');
  const configUrl = typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.SUPABASE_URL : '';
  const configKey = typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.SUPABASE_ANON_KEY : '';

  const url = (storedUrl || configUrl || '').trim();
  const key = (storedKey || configKey || '').trim();

  if (url && key && window.supabase) {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      updateConnectionStatusUI(true);
      return true;
    } catch (err) {
      console.error('Error initializing Supabase client:', err);
      supabaseClient = null;
      updateConnectionStatusUI(false);
      return false;
    }
  } else {
    supabaseClient = null;
    updateConnectionStatusUI(false);
    return false;
  }
}

function isSupabaseConnected() {
  return supabaseClient !== null;
}

function updateConnectionStatusUI(connected) {
  const badge = document.getElementById('admin-connection-badge');
  const badgeText = document.getElementById('admin-connection-status-text');
  const settingsPill = document.getElementById('settings-supabase-status');

  if (connected) {
    if (badge) {
      badge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200';
    }
    if (badgeText) badgeText.textContent = 'Cloud Connected';
    if (settingsPill) {
      settingsPill.className = 'text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200';
      settingsPill.textContent = 'Cloud Connected';
    }
  } else {
    if (badge) {
      badge.className = 'inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200';
    }
    if (badgeText) badgeText.textContent = 'Demo Mode';
    if (settingsPill) {
      settingsPill.className = 'text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200';
      settingsPill.textContent = 'Demo Mode';
    }
  }
}

// ==================== STORAGE & DATABASE HELPERS ====================

async function loadProducts() {
  if (isSupabaseConnected()) {
    try {
      const { data, error } = await supabaseClient
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data && data.length > 0) {
        state.products = data.map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: item.price,
          originalPrice: item.original_price,
          badge: item.badge || 'ready',
          image: item.image,
          description: item.description || '',
          dimensions: item.dimensions || 'Standard',
          yarn: item.yarn || '100% Premium Milk Cotton',
          care: item.care || 'Gentle hand wash cold, dry flat'
        }));
        renderCatalog();
        return;
      }
    } catch (err) {
      console.warn('Could not fetch products from Supabase, using local catalog:', err);
    }
  }

  // Fallback to local storage / default demo products
  loadStateFromStorage();
  renderCatalog();
}

function loadStateFromStorage() {
  const storedProducts = localStorage.getItem('clc_products');
  if (storedProducts) {
    try {
      state.products = JSON.parse(storedProducts);
    } catch (e) {
      state.products = [...DEFAULT_PRODUCTS];
    }
  } else {
    state.products = [...DEFAULT_PRODUCTS];
    saveProductsToStorage();
  }

  const storedSettings = localStorage.getItem('clc_settings');
  if (storedSettings) {
    try {
      state.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(storedSettings) };
      if (state.settings.whatsapp === '919876543210') {
        state.settings.whatsapp = DEFAULT_SETTINGS.whatsapp;
        saveSettingsToStorage();
      }
    } catch (e) {
      state.settings = { ...DEFAULT_SETTINGS };
    }
  } else {
    state.settings = { ...DEFAULT_SETTINGS };
    saveSettingsToStorage();
  }

  const storedCart = localStorage.getItem('clc_cart');
  if (storedCart) {
    try {
      state.cart = JSON.parse(storedCart);
    } catch (e) {
      state.cart = [];
    }
  }
}

function saveProductsToStorage() {
  localStorage.setItem('clc_products', JSON.stringify(state.products));
}

function saveSettingsToStorage() {
  localStorage.setItem('clc_settings', JSON.stringify(state.settings));
}

function saveCartToStorage() {
  localStorage.setItem('clc_cart', JSON.stringify(state.cart));
}

// Upload a photo file to Supabase Cloud Storage bucket 'crochet-photos'
async function uploadPhotoToSupabase(file) {
  if (!isSupabaseConnected() || !file) return null;
  try {
    const ext = file.name.split('.').pop() || 'jpg';
    const cleanFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
    const filePath = `creations/${cleanFileName}`;

    const { error: uploadError } = await supabaseClient.storage
      .from('crochet-photos')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabaseClient.storage
      .from('crochet-photos')
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  } catch (err) {
    console.error('Supabase image upload failed:', err);
    throw err;
  }
}

// ==================== AUTHENTICATION ====================

async function checkAuthSession() {
  if (!isSupabaseConnected()) return;

  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) throw error;

    if (session && session.user) {
      currentAuthUser = session.user;
      setAdminAuthenticated(true);
    } else {
      currentAuthUser = null;
      setAdminAuthenticated(false);
    }
  } catch (err) {
    console.warn('Session check failed:', err);
  }
}

function setAdminAuthenticated(isAuth) {
  const authScreen = document.getElementById('admin-auth-screen');
  const authedScreen = document.getElementById('admin-authenticated-screen');
  const signoutBtn = document.getElementById('btn-admin-signout');

  if (isAuth) {
    authScreen.classList.add('hidden');
    authedScreen.classList.remove('hidden');
    if (signoutBtn) signoutBtn.classList.remove('hidden');
    renderAdminCatalog();
    populateSettingsForm();
  } else {
    authScreen.classList.remove('hidden');
    authedScreen.classList.add('hidden');
    if (signoutBtn) signoutBtn.classList.add('hidden');
  }
}

// ==================== UI RENDERING ====================

function renderCatalog() {
  const grid = document.getElementById('products-grid');
  const countText = document.getElementById('catalog-count-text');
  const emptyState = document.getElementById('empty-state');

  // Filter
  let filtered = state.products.filter(item => {
    if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
      return false;
    }
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase();
      const matchName = (item.name || '').toLowerCase().includes(q);
      const matchDesc = (item.description || '').toLowerCase().includes(q);
      const matchCat = (item.category || '').toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  // Sort
  if (state.sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'name') {
    filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  }

  if (countText) {
    countText.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? 'creation' : 'creations'}`;
  }

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  grid.innerHTML = filtered.map(product => {
    const isSold = product.badge === 'sold';
    const isReady = product.badge === 'ready';

    let badgeHtml = '';
    if (isReady) {
      badgeHtml = `<span class="bg-brand-sage text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">Ready to Ship</span>`;
    } else if (product.badge === 'custom') {
      badgeHtml = `<span class="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">Made to Order</span>`;
    } else {
      badgeHtml = `<span class="bg-stone-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs">Sold Out</span>`;
    }

    const discountHtml = product.originalPrice && product.originalPrice > product.price
      ? `<span class="text-xs text-brand-muted/70 line-through">₹${product.originalPrice}</span>`
      : '';

    return `
      <article class="bg-white rounded-3xl border border-brand-border/70 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group">
        <div class="relative aspect-square bg-brand-warm overflow-hidden cursor-pointer btn-open-detail" data-id="${product.id}">
          <img 
            src="${product.image}" 
            alt="${escapeHtml(product.name)}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ${isSold ? 'grayscale opacity-75' : ''}"
            loading="lazy"
            onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop';"
          >
          <div class="absolute top-3 left-3">
            ${badgeHtml}
          </div>
          <button 
            class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-brand-dark flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-white"
            title="Quick view"
          >
            <i data-lucide="eye" class="w-4 h-4"></i>
          </button>
        </div>

        <div class="p-5 flex flex-col flex-grow justify-between">
          <div>
            <div class="flex items-center justify-between text-[11px] text-brand-muted uppercase tracking-widest font-semibold">
              <span>${getCategoryLabel(product.category)}</span>
            </div>
            <h4 class="font-serif text-lg font-bold text-brand-dark mt-1 group-hover:text-brand-rose transition-colors cursor-pointer btn-open-detail" data-id="${product.id}">
              ${escapeHtml(product.name)}
            </h4>
            <p class="text-xs text-brand-muted line-clamp-2 mt-1.5 leading-relaxed">
              ${escapeHtml(product.description)}
            </p>
          </div>

          <div class="pt-4 mt-3 border-t border-brand-border/50">
            <div class="flex items-baseline gap-2 mb-3">
              <span class="font-serif text-xl font-bold text-brand-dark">₹${product.price}</span>
              ${discountHtml}
            </div>

            <div class="grid grid-cols-2 gap-2">
              <button 
                class="btn-add-cart w-full py-2 px-3 rounded-xl border border-brand-border hover:border-brand-dark bg-white hover:bg-brand-warm text-brand-dark text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${isSold ? 'opacity-50 pointer-events-none' : ''}"
                data-id="${product.id}"
                ${isSold ? 'disabled' : ''}
              >
                <i data-lucide="shopping-bag" class="w-3.5 h-3.5 text-brand-rose"></i>
                <span>${isSold ? 'Sold' : 'Add to Bag'}</span>
              </button>

              <button 
                class="btn-direct-whatsapp w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                data-id="${product.id}"
              >
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                <span>Order</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');

  lucide.createIcons();
  attachCatalogEvents();
}

function getCategoryLabel(cat) {
  const map = {
    plushies: '🧸 Amigurumi',
    bags: '👜 Bag & Tote',
    wearables: '🧶 Wearable',
    accessories: '🌸 Accessory',
    home: '☕ Home Decor'
  };
  return map[cat] || 'Handmade';
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[m];
  });
}

function attachCatalogEvents() {
  document.querySelectorAll('.btn-open-detail').forEach(el => {
    el.addEventListener('click', () => {
      openProductModal(el.getAttribute('data-id'));
    });
  });

  document.querySelectorAll('.btn-add-cart').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      addToCart(el.getAttribute('data-id'));
    });
  });

  document.querySelectorAll('.btn-direct-whatsapp').forEach(el => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      handleSingleItemWhatsApp(el.getAttribute('data-id'));
    });
  });
}

// ==================== CART LOGIC ====================

function addToCart(productId, quantity = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  if (product.badge === 'sold') {
    showToast('This creation is currently sold out.', 'warning');
    return;
  }

  const existing = state.cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity
    });
  }

  saveCartToStorage();
  updateCartUI();
  showToast(`Added "${product.name}" to your bag!`);
}

function updateCartQuantity(productId, delta) {
  const index = state.cart.findIndex(i => i.id === productId);
  if (index === -1) return;

  state.cart[index].quantity += delta;
  if (state.cart[index].quantity <= 0) {
    state.cart.splice(index, 1);
  }

  saveCartToStorage();
  updateCartUI();
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
}

function updateCartUI() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  document.getElementById('cart-badge').textContent = totalCount;
  document.getElementById('cart-count-pill').textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
  document.getElementById('cart-subtotal-price').textContent = `₹${subtotal.toLocaleString('en-IN')}`;

  const container = document.getElementById('cart-items-container');
  const footer = document.getElementById('cart-footer');

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="py-16 text-center">
        <div class="w-16 h-16 rounded-full bg-brand-warm mx-auto flex items-center justify-center text-3xl mb-3">🧺</div>
        <p class="font-serif text-lg font-bold text-brand-dark">Your bag is empty</p>
        <p class="text-xs text-brand-muted mt-1 max-w-xs mx-auto">Explore our cozy crochet pieces and add your favorites to order.</p>
        <button id="btn-cart-browse" class="mt-4 px-5 py-2 rounded-full bg-brand-dark text-white text-xs font-semibold hover:bg-brand-rose transition-colors">
          Browse Creations
        </button>
      </div>
    `;
    const browseBtn = document.getElementById('btn-cart-browse');
    if (browseBtn) browseBtn.addEventListener('click', closeCartDrawer);
    footer.classList.add('opacity-50', 'pointer-events-none');
    return;
  }

  footer.classList.remove('opacity-50', 'pointer-events-none');

  container.innerHTML = state.cart.map(item => `
    <div class="py-3 flex items-center gap-3">
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-2xl bg-brand-warm shrink-0 border border-brand-border/60">
      <div class="flex-grow">
        <h5 class="text-xs font-bold text-brand-dark leading-tight">${escapeHtml(item.name)}</h5>
        <p class="text-xs font-semibold text-brand-rose mt-1">₹${item.price.toLocaleString('en-IN')}</p>
        <div class="flex items-center gap-2 mt-2">
          <div class="flex items-center border border-brand-border rounded-lg bg-brand-cream/60">
            <button class="px-2 py-0.5 text-xs text-brand-muted hover:text-brand-dark btn-cart-dec" data-id="${item.id}">-</button>
            <span class="px-2 text-xs font-bold text-brand-dark">${item.quantity}</span>
            <button class="px-2 py-0.5 text-xs text-brand-muted hover:text-brand-dark btn-cart-inc" data-id="${item.id}">+</button>
          </div>
          <button class="text-[11px] text-red-500 hover:text-red-700 underline btn-cart-remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
      <div class="text-right">
        <span class="text-xs font-bold text-brand-dark">₹${(item.price * item.quantity).toLocaleString('en-IN')}</span>
      </div>
    </div>
  `).join('');

  container.querySelectorAll('.btn-cart-inc').forEach(btn => {
    btn.addEventListener('click', () => updateCartQuantity(btn.dataset.id, 1));
  });
  container.querySelectorAll('.btn-cart-dec').forEach(btn => {
    btn.addEventListener('click', () => updateCartQuantity(btn.dataset.id, -1));
  });
  container.querySelectorAll('.btn-cart-remove').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.id));
  });

  lucide.createIcons();
}

function openSidebar() {
  const sidebar = document.getElementById('nav-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar || !overlay) return;
  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.classList.remove('opacity-0');
    sidebar.classList.remove('-translate-x-full');
  }, 10);
}

function closeSidebar() {
  const sidebar = document.getElementById('nav-sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  if (!sidebar || !overlay) return;
  sidebar.classList.add('-translate-x-full');
  overlay.classList.add('opacity-0');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300);
}

function setCategory(category, scrollToCatalog = false) {
  state.activeCategory = category;

  // Update horizontal category pills
  document.querySelectorAll('.cat-pill').forEach(b => {
    if (b.dataset.cat === category) {
      b.classList.add('active', 'bg-brand-dark', 'text-white', 'shadow-xs');
      b.classList.remove('bg-white', 'text-brand-muted');
    } else {
      b.classList.remove('active', 'bg-brand-dark', 'text-white', 'shadow-xs');
      b.classList.add('bg-white', 'text-brand-muted');
    }
  });

  // Update sidebar category items
  document.querySelectorAll('.sidebar-cat-btn').forEach(b => {
    if (b.dataset.cat === category) {
      b.classList.add('active', 'bg-brand-dark', 'text-white', 'shadow-xs');
      b.classList.remove('text-brand-dark', 'hover:bg-brand-warm');
    } else {
      b.classList.remove('active', 'bg-brand-dark', 'text-white', 'shadow-xs');
      b.classList.add('text-brand-dark', 'hover:bg-brand-warm');
    }
  });

  renderCatalog();

  if (scrollToCatalog) {
    const catalogEl = document.getElementById('catalog');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

function openCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  overlay.classList.remove('hidden');
  setTimeout(() => {
    overlay.classList.remove('opacity-0');
    drawer.classList.remove('translate-x-full');
  }, 10);
  updateCartUI();
}

function closeCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-drawer-overlay');
  drawer.classList.add('translate-x-full');
  overlay.classList.add('opacity-0');
  setTimeout(() => {
    overlay.classList.add('hidden');
  }, 300);
}

// ==================== WHATSAPP CHECKOUT FLOW ====================

function handleSingleItemWhatsApp(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const phone = state.settings.whatsapp || (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.DEFAULT_WHATSAPP : '918197477497');
  const statusNote = product.badge === 'custom' ? '(Made to Order, approx 3-5 days)' : '';

  const message = 
`🌸 *Cute Little Crochet - Order Inquiry* 🌸
-----------------------------------------
Hi! I would like to order this handmade piece:

✨ *${product.name}*
💰 *Price:* ₹${product.price} ${statusNote}
🔗 *Item ID:* ${product.id}

Please let me know if this is available for delivery to my pincode, and share your UPI details (GPay/PhonePe). Thank you!`;

  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

function handleCartWhatsAppCheckout() {
  if (state.cart.length === 0) return;

  const nameInput = document.getElementById('order-customer-name');
  const pincodeInput = document.getElementById('order-customer-pincode');
  const noteInput = document.getElementById('order-customer-note');

  const customerName = nameInput.value.trim() || 'Valued Customer';
  const pincode = pincodeInput.value.trim() || 'Not specified yet';
  const note = noteInput.value.trim();

  const phone = state.settings.whatsapp || (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.DEFAULT_WHATSAPP : '918197477497');
  const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  let itemsList = state.cart.map(item => `• ${item.quantity}x ${item.name} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`).join('\n');

  let message = 
`🌸 *Cute Little Crochet - New Order Request* 🌸
-----------------------------------------
👤 *Name:* ${customerName}
📍 *Delivery Pincode:* ${pincode}

🛍️ *Order Summary:*
${itemsList}

💰 *Subtotal:* ₹${subtotal.toLocaleString('en-IN')}
*(Standard shipping will be added based on pincode)*
`;

  if (note) {
    message += `\n💬 *Customer Note:* ${note}\n`;
  }

  message += `
-----------------------------------------
Please confirm stock and share your UPI ID / QR code (GPay / PhonePe / Paytm). Thank you!`;

  const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==================== PRODUCT DETAIL MODAL ====================

function openProductModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  state.selectedProduct = product;
  const modal = document.getElementById('product-detail-modal');

  document.getElementById('modal-product-image').src = product.image;
  document.getElementById('modal-product-image').alt = product.name;
  document.getElementById('modal-product-category').textContent = getCategoryLabel(product.category);
  document.getElementById('modal-product-title').textContent = product.name;
  document.getElementById('modal-product-price').textContent = `₹${product.price.toLocaleString('en-IN')}`;

  const origPriceEl = document.getElementById('modal-product-original-price');
  if (product.originalPrice && product.originalPrice > product.price) {
    origPriceEl.textContent = `₹${product.originalPrice}`;
    origPriceEl.classList.remove('hidden');
  } else {
    origPriceEl.classList.add('hidden');
  }

  const badgeEl = document.getElementById('modal-product-badge');
  if (product.badge === 'ready') {
    badgeEl.textContent = 'Ready to Ship';
    badgeEl.className = 'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-xs bg-brand-sage text-white';
  } else if (product.badge === 'custom') {
    badgeEl.textContent = 'Made to Order (3-5 Days)';
    badgeEl.className = 'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-xs bg-amber-600 text-white';
  } else {
    badgeEl.textContent = 'Sold Out';
    badgeEl.className = 'absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold tracking-wide shadow-xs bg-stone-500 text-white';
  }

  document.getElementById('modal-product-description').textContent = product.description;
  document.getElementById('modal-product-yarn').textContent = product.yarn || '100% Premium Milk Cotton';
  document.getElementById('modal-product-dimensions').textContent = product.dimensions || 'Standard';
  document.getElementById('modal-product-care').textContent = product.care || 'Hand wash cold, dry flat';

  const addBtn = document.getElementById('modal-btn-add-to-bag');
  if (product.badge === 'sold') {
    addBtn.disabled = true;
    addBtn.classList.add('opacity-50', 'pointer-events-none');
    addBtn.innerHTML = `<span>Sold Out</span>`;
  } else {
    addBtn.disabled = false;
    addBtn.classList.remove('opacity-50', 'pointer-events-none');
    addBtn.innerHTML = `<i data-lucide="shopping-bag" class="w-4 h-4"></i><span>Add to Bag</span>`;
  }

  lucide.createIcons();
  modal.showModal();
}

// ==================== OWNER ADMIN PANEL ====================

function setupAdminPanel() {
  const adminModal = document.getElementById('admin-modal');
  const authScreen = document.getElementById('admin-auth-screen');
  const authedScreen = document.getElementById('admin-authenticated-screen');

  // Open modal
  const openAdmin = () => {
    // If Supabase is connected, check if session is already active
    if (isSupabaseConnected() && currentAuthUser) {
      setAdminAuthenticated(true);
    } else if (!isSupabaseConnected() && currentAuthUser === 'demo-unlocked') {
      setAdminAuthenticated(true);
    } else {
      setAdminAuthenticated(false);
    }
    adminModal.showModal();
  };

  document.getElementById('btn-open-admin').addEventListener('click', openAdmin);
  document.getElementById('btn-footer-admin').addEventListener('click', openAdmin);

  document.getElementById('btn-close-admin-modal').addEventListener('click', () => {
    adminModal.close();
  });

  // Sign out button in admin header
  const signoutBtn = document.getElementById('btn-admin-signout');
  if (signoutBtn) {
    signoutBtn.addEventListener('click', async () => {
      if (isSupabaseConnected()) {
        try {
          await supabaseClient.auth.signOut();
        } catch (e) {}
      }
      currentAuthUser = null;
      setAdminAuthenticated(false);
      showToast('Signed out of Owner Dashboard.');
    });
  }

  // Supabase Email/Password Login
  const authForm = document.getElementById('form-supabase-auth');
  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-email-input').value.trim();
      const password = document.getElementById('admin-password-input').value;

      if (!isSupabaseConnected()) {
        showToast('Supabase is not configured yet. Use Demo PIN (1234) below, or configure Supabase in Settings!', 'warning');
        return;
      }

      const submitBtn = document.getElementById('btn-submit-auth');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Signing in...</span>`;

      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email, password });
        if (error) throw error;

        currentAuthUser = data.user;
        setAdminAuthenticated(true);
        showToast('Signed in securely via Supabase Cloud!');
      } catch (err) {
        showToast(err.message || 'Login failed. Check your email and password.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i data-lucide="log-in" class="w-4 h-4"></i><span>Log In via Cloud</span>`;
        lucide.createIcons();
      }
    });
  }

  // Fallback Offline Demo PIN unlock
  const pinInput = document.getElementById('admin-pin-input');
  const btnSubmitPin = document.getElementById('btn-submit-pin');
  btnSubmitPin.addEventListener('click', () => {
    const entered = pinInput.value.trim();
    const correctPin = state.settings.pin || '1234';

    if (entered === correctPin) {
      currentAuthUser = 'demo-unlocked';
      setAdminAuthenticated(true);
      showToast('Unlocked in Demo / Local Mode!');
    } else {
      showToast('Incorrect demo PIN. Try 1234.', 'error');
      pinInput.value = '';
      pinInput.focus();
    }
  });

  pinInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') btnSubmitPin.click();
  });

  // Admin Tab Switching
  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.adminTab;
      document.querySelectorAll('.admin-tab').forEach(t => {
        t.classList.remove('active', 'border-brand-rose', 'text-brand-rose', 'font-semibold');
        t.classList.add('border-transparent', 'text-brand-muted');
      });
      tab.classList.add('active', 'border-brand-rose', 'text-brand-rose', 'font-semibold');
      tab.classList.remove('border-transparent', 'text-brand-muted');

      document.getElementById('tab-admin-items').classList.toggle('hidden', target !== 'items');
      document.getElementById('tab-admin-add').classList.toggle('hidden', target !== 'add');
      document.getElementById('tab-admin-settings').classList.toggle('hidden', target !== 'settings');
      document.getElementById('tab-admin-backup').classList.toggle('hidden', target !== 'backup');
    });
  });

  document.getElementById('btn-go-to-add').addEventListener('click', () => {
    document.querySelector('[data-admin-tab="add"]').click();
  });

  // Photo File Upload for New Item
  const fileInput = document.getElementById('new-item-file');
  const previewBox = document.getElementById('image-preview-box');
  const previewThumb = document.getElementById('image-preview-thumb');

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Photo is too large. Please select an image under 5MB.', 'warning');
      fileInput.value = '';
      return;
    }

    uploadedImageFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      uploadedImageBase64 = event.target.result;
      previewThumb.src = uploadedImageBase64;
      previewBox.classList.remove('hidden');
      document.getElementById('new-item-image-url').value = '';
    };
    reader.readAsDataURL(file);
  });

  // Add Product Form
  const addForm = document.getElementById('form-add-creation');
  addForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('new-item-name').value.trim();
    const category = document.getElementById('new-item-category').value;
    const badge = document.getElementById('new-item-badge').value;
    const price = parseInt(document.getElementById('new-item-price').value, 10);
    const origPriceVal = document.getElementById('new-item-original-price').value.trim();
    const originalPrice = origPriceVal ? parseInt(origPriceVal, 10) : null;
    const desc = document.getElementById('new-item-description').value.trim();
    const yarn = document.getElementById('new-item-yarn').value.trim();
    const dimensions = document.getElementById('new-item-dimensions').value.trim();
    const urlInput = document.getElementById('new-item-image-url').value.trim();

    let finalImageUrl = 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?q=80&w=800&auto=format&fit=crop';

    // Show loading state
    const submitBtn = addForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Uploading...</span>`;

    try {
      if (isSupabaseConnected() && uploadedImageFile) {
        showToast('Uploading photo to Supabase Cloud Storage...');
        finalImageUrl = await uploadPhotoToSupabase(uploadedImageFile);
      } else if (urlInput) {
        finalImageUrl = urlInput;
      } else if (uploadedImageBase64) {
        finalImageUrl = uploadedImageBase64;
      }

      const newProduct = {
        id: 'clc-' + Date.now(),
        name,
        category,
        badge,
        price,
        original_price: originalPrice,
        image: finalImageUrl,
        description: desc,
        yarn: yarn || '100% Premium Milk Cotton',
        dimensions: dimensions || 'Standard',
        care: 'Gentle hand wash, dry flat'
      };

      if (isSupabaseConnected()) {
        const { data, error } = await supabaseClient
          .from('products')
          .insert([newProduct])
          .select();

        if (error) throw error;
        await loadProducts();
      } else {
        // Local mode fallback
        state.products.unshift({
          ...newProduct,
          originalPrice: originalPrice
        });
        saveProductsToStorage();
        renderCatalog();
        renderAdminCatalog();
      }

      addForm.reset();
      uploadedImageFile = null;
      uploadedImageBase64 = null;
      previewBox.classList.add('hidden');

      showToast(`Published "${name}" to your shop!`);
      document.querySelector('[data-admin-tab="items"]').click();
    } catch (err) {
      console.error(err);
      showToast(`Failed to publish item: ${err.message}`, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Publish to Storefront</span>`;
    }
  });

  // Supabase Connection Form in Settings
  const btnConnectSupabase = document.getElementById('btn-connect-supabase');
  if (btnConnectSupabase) {
    btnConnectSupabase.addEventListener('click', async () => {
      const url = document.getElementById('setting-supabase-url').value.trim();
      const key = document.getElementById('setting-supabase-anon-key').value.trim();

      if (!url || !key) {
        showToast('Please enter both Supabase Project URL and Anon Key.', 'warning');
        return;
      }

      localStorage.setItem('clc_supabase_url', url);
      localStorage.setItem('clc_supabase_anon_key', key);

      const success = initSupabase();
      if (success) {
        showToast('Connected to Supabase! Testing connection...');
        await loadProducts();
        await checkAuthSession();
        showToast('Connected to Supabase Cloud Database successfully!');
      } else {
        showToast('Could not connect. Please verify your URL and Anon Key.', 'error');
      }
    });
  }

  // Shop Settings Form
  const settingsForm = document.getElementById('form-shop-settings');
  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const wa = document.getElementById('setting-whatsapp').value.trim().replace(/[^0-9]/g, '');
    const upi = document.getElementById('setting-upi').value.trim();
    const banner = document.getElementById('setting-announcement').value.trim();
    const newPin = document.getElementById('setting-new-pin').value.trim();

    if (wa) state.settings.whatsapp = wa;
    if (upi) state.settings.upi = upi;
    if (banner) state.settings.announcement = banner;
    if (newPin) state.settings.pin = newPin;

    saveSettingsToStorage();
    applySettingsToDOM();
    showToast('Shop configurations saved!');
  });

  // Backup: Export JSON
  document.getElementById('btn-export-catalog').addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cute-little-crochet-catalog-${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catalog downloaded as JSON backup!');
  });

  // Backup: Import JSON
  const importInput = document.getElementById('input-import-catalog');
  importInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) {
          state.products = imported;
          saveProductsToStorage();
          renderCatalog();
          renderAdminCatalog();
          showToast(`Successfully imported ${imported.length} creations!`);
        } else {
          showToast('Invalid catalog format. Must be an array of products.', 'error');
        }
      } catch (err) {
        showToast('Failed to parse JSON file.', 'error');
      }
    };
    reader.readAsText(file);
  });

  // Reset to Defaults
  document.getElementById('btn-reset-defaults').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all items to the sample demo products?')) {
      state.products = [...DEFAULT_PRODUCTS];
      saveProductsToStorage();
      renderCatalog();
      renderAdminCatalog();
      showToast('Reset catalog to default demo creations.');
    }
  });

  // Edit Modal Event Listeners
  const editModal = document.getElementById('admin-edit-modal');
  const closeEditModal = () => editModal.close();

  document.getElementById('btn-close-edit-modal').addEventListener('click', closeEditModal);
  document.getElementById('btn-cancel-edit').addEventListener('click', closeEditModal);

  // Edit Image File Upload
  const editFileInput = document.getElementById('edit-item-file');
  const editPreviewThumb = document.getElementById('edit-image-preview-thumb');

  editFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('Photo is too large. Please select an image under 5MB.', 'warning');
      editFileInput.value = '';
      return;
    }

    editUploadedImageFile = file;
    const reader = new FileReader();
    reader.onload = (event) => {
      editUploadedImageBase64 = event.target.result;
      editPreviewThumb.src = editUploadedImageBase64;
      document.getElementById('edit-item-image-url').value = '';
    };
    reader.readAsDataURL(file);
  });

  // Edit Form Submission
  const editForm = document.getElementById('form-edit-creation');
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-item-id').value;
    const index = state.products.findIndex(p => p.id === id);
    if (index === -1) return;

    const name = document.getElementById('edit-item-name').value.trim();
    const category = document.getElementById('edit-item-category').value;
    const badge = document.getElementById('edit-item-badge').value;
    const price = parseInt(document.getElementById('edit-item-price').value, 10);
    const origPriceVal = document.getElementById('edit-item-original-price').value.trim();
    const originalPrice = origPriceVal ? parseInt(origPriceVal, 10) : null;
    const desc = document.getElementById('edit-item-description').value.trim();
    const yarn = document.getElementById('edit-item-yarn').value.trim();
    const dimensions = document.getElementById('edit-item-dimensions').value.trim();
    const care = document.getElementById('edit-item-care').value.trim();
    const urlInput = document.getElementById('edit-item-image-url').value.trim();

    const existingProduct = state.products[index];
    let finalImage = existingProduct.image;

    const saveBtn = editForm.querySelector('button[type="submit"]');
    saveBtn.disabled = true;
    saveBtn.innerHTML = `<span>Saving...</span>`;

    try {
      if (isSupabaseConnected() && editUploadedImageFile) {
        showToast('Uploading new photo to Supabase Storage...');
        finalImage = await uploadPhotoToSupabase(editUploadedImageFile);
      } else if (urlInput) {
        finalImage = urlInput;
      } else if (editUploadedImageBase64) {
        finalImage = editUploadedImageBase64;
      }

      if (isSupabaseConnected()) {
        const { error } = await supabaseClient
          .from('products')
          .update({
            name,
            category,
            badge,
            price,
            original_price: originalPrice,
            image: finalImage,
            description: desc,
            yarn: yarn || '100% Premium Milk Cotton',
            dimensions: dimensions || 'Standard',
            care: care || 'Gentle hand wash cold, dry flat'
          })
          .eq('id', id);

        if (error) throw error;
        await loadProducts();
      } else {
        state.products[index] = {
          ...existingProduct,
          name,
          category,
          badge,
          price,
          originalPrice,
          image: finalImage,
          description: desc,
          yarn: yarn || '100% Premium Milk Cotton',
          dimensions: dimensions || 'Standard',
          care: care || 'Gentle hand wash cold, dry flat'
        };
        saveProductsToStorage();
        renderCatalog();
        renderAdminCatalog();
      }

      // Update active cart item if present
      state.cart.forEach(cartItem => {
        if (cartItem.id === id) {
          cartItem.name = name;
          cartItem.price = price;
          cartItem.image = finalImage;
        }
      });
      saveCartToStorage();
      updateCartUI();

      editModal.close();
      showToast(`Updated "${name}" successfully!`);
    } catch (err) {
      console.error(err);
      showToast(`Failed to update item: ${err.message}`, 'error');
    } finally {
      saveBtn.disabled = false;
      saveBtn.innerHTML = `<span>Save Changes</span>`;
    }
  });
}

function renderAdminCatalog() {
  const tbody = document.getElementById('admin-items-table-body');
  document.getElementById('admin-item-count').textContent = state.products.length;

  tbody.innerHTML = state.products.map(p => {
    const isSold = p.badge === 'sold';
    return `
      <tr class="hover:bg-brand-cream/40 transition-colors">
        <td class="p-3 flex items-center gap-2.5">
          <img src="${p.image}" class="w-9 h-9 rounded-lg object-cover bg-brand-warm shrink-0">
          <span class="font-medium text-brand-dark line-clamp-1">${escapeHtml(p.name)}</span>
        </td>
        <td class="p-3 text-brand-muted">${getCategoryLabel(p.category)}</td>
        <td class="p-3 font-semibold text-brand-dark">₹${p.price}</td>
        <td class="p-3">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${
            p.badge === 'ready' ? 'bg-emerald-100 text-emerald-800' :
            p.badge === 'custom' ? 'bg-amber-100 text-amber-800' : 'bg-stone-200 text-stone-700'
          }">
            ${p.badge === 'ready' ? 'Ready' : p.badge === 'custom' ? 'Custom' : 'Sold Out'}
          </span>
        </td>
        <td class="p-3 text-right space-x-1.5">
          <button class="btn-admin-edit text-xs text-brand-dark hover:text-brand-rose font-semibold inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-brand-border hover:border-brand-dark bg-white transition-colors" data-id="${p.id}">
            <i data-lucide="edit-3" class="w-3.5 h-3.5 text-brand-rose"></i>
            <span>Edit</span>
          </button>
          <button class="btn-admin-toggle-sold text-xs ${isSold ? 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200' : 'text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200'} font-medium px-2.5 py-1 rounded-lg transition-colors" data-id="${p.id}">
            ${isSold ? 'Mark In Stock' : 'Mark Sold'}
          </button>
          <button class="btn-admin-delete text-xs text-red-600 hover:text-red-800 hover:bg-red-50 font-medium px-2 py-1 rounded-lg transition-colors" data-id="${p.id}">
            Delete
          </button>
        </td>
      </tr>
    `;
  }).join('');

  tbody.querySelectorAll('.btn-admin-edit').forEach(btn => {
    btn.addEventListener('click', () => {
      openEditItemModal(btn.dataset.id);
    });
  });

  tbody.querySelectorAll('.btn-admin-toggle-sold').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const item = state.products.find(p => p.id === id);
      if (!item) return;

      const newBadge = item.badge === 'sold' ? 'ready' : 'sold';

      if (isSupabaseConnected()) {
        try {
          const { error } = await supabaseClient
            .from('products')
            .update({ badge: newBadge })
            .eq('id', id);

          if (error) throw error;
          await loadProducts();
          renderAdminCatalog();
          showToast(`Updated status for "${item.name}"`);
        } catch (err) {
          showToast(`Error updating status: ${err.message}`, 'error');
        }
      } else {
        item.badge = newBadge;
        saveProductsToStorage();
        renderCatalog();
        renderAdminCatalog();
        showToast(`Updated status for "${item.name}"`);
      }
    });
  });

  tbody.querySelectorAll('.btn-admin-delete').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const item = state.products.find(p => p.id === id);
      if (item && confirm(`Delete "${item.name}"?`)) {
        if (isSupabaseConnected()) {
          try {
            const { error } = await supabaseClient
              .from('products')
              .delete()
              .eq('id', id);

            if (error) throw error;
            await loadProducts();
            renderAdminCatalog();
            showToast(`Deleted "${item.name}".`);
          } catch (err) {
            showToast(`Error deleting: ${err.message}`, 'error');
          }
        } else {
          state.products = state.products.filter(p => p.id !== id);
          saveProductsToStorage();
          renderCatalog();
          renderAdminCatalog();
          showToast(`Deleted "${item.name}".`);
        }
      }
    });
  });

  lucide.createIcons();
}

function openEditItemModal(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('admin-edit-modal');
  document.getElementById('edit-item-id').value = product.id;
  document.getElementById('edit-item-name').value = product.name;
  document.getElementById('edit-item-category').value = product.category;
  document.getElementById('edit-item-badge').value = product.badge;
  document.getElementById('edit-item-price').value = product.price;
  document.getElementById('edit-item-original-price').value = product.originalPrice || '';
  document.getElementById('edit-item-description').value = product.description;
  document.getElementById('edit-item-yarn').value = product.yarn || '';
  document.getElementById('edit-item-dimensions').value = product.dimensions || '';
  document.getElementById('edit-item-care').value = product.care || '';
  document.getElementById('edit-item-image-url').value = '';
  document.getElementById('edit-item-file').value = '';

  editUploadedImageFile = null;
  editUploadedImageBase64 = null;
  document.getElementById('edit-image-preview-thumb').src = product.image;

  lucide.createIcons();
  modal.showModal();
}

function populateSettingsForm() {
  document.getElementById('setting-whatsapp').value = state.settings.whatsapp || '';
  document.getElementById('setting-upi').value = state.settings.upi || '';
  document.getElementById('setting-announcement').value = state.settings.announcement || '';
  document.getElementById('setting-new-pin').value = '';

  const storedUrl = localStorage.getItem('clc_supabase_url') || (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.SUPABASE_URL : '');
  const storedKey = localStorage.getItem('clc_supabase_anon_key') || (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.SUPABASE_ANON_KEY : '');
  document.getElementById('setting-supabase-url').value = storedUrl || '';
  document.getElementById('setting-supabase-anon-key').value = storedKey || '';
}

function applySettingsToDOM() {
  const banner = document.getElementById('announcement-text');
  if (banner && state.settings.announcement) {
    banner.textContent = state.settings.announcement;
  }

  const footerWa = document.getElementById('footer-whatsapp-link');
  if (footerWa && state.settings.whatsapp) {
    footerWa.href = `https://wa.me/${state.settings.whatsapp}`;
  }
}

// ==================== TOAST SYSTEM ====================

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  
  const bg = type === 'error' ? 'bg-red-600' : type === 'warning' ? 'bg-amber-600' : 'bg-brand-dark';
  
  toast.className = `${bg} text-white text-xs font-medium py-2.5 px-4 rounded-full shadow-lg flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto`;
  toast.innerHTML = `<span>🌸</span><span>${escapeHtml(message)}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-2', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3400);
}

// ==================== INITIALIZATION & EVENT LISTENERS ====================

document.addEventListener('DOMContentLoaded', async () => {
  loadStateFromStorage();
  initSupabase();
  applySettingsToDOM();

  // Load creations from Supabase (or fallback to local)
  await loadProducts();
  await checkAuthSession();

  updateCartUI();
  setupAdminPanel();

  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Category filter pills (Horizontal)
  document.querySelectorAll('.cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      setCategory(btn.dataset.cat, false);
    });
  });

  // Sidebar Controls
  const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
  const btnCloseSidebar = document.getElementById('btn-close-sidebar');
  const sidebarOverlay = document.getElementById('sidebar-overlay');

  if (btnToggleSidebar) btnToggleSidebar.addEventListener('click', openSidebar);
  if (btnCloseSidebar) btnCloseSidebar.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Sidebar Category Filter buttons
  document.querySelectorAll('.sidebar-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setCategory(btn.dataset.cat, true);
      closeSidebar();
    });
  });

  // Sidebar Navigation Links
  const sidebarHome = document.getElementById('sidebar-link-home');
  if (sidebarHome) {
    sidebarHome.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      closeSidebar();
    });
  }

  const sidebarCatalog = document.getElementById('sidebar-link-catalog');
  if (sidebarCatalog) {
    sidebarCatalog.addEventListener('click', () => {
      setCategory('all', true);
      closeSidebar();
    });
  }

  // Search input
  const searchInput = document.getElementById('search-input');
  const searchInputMobile = document.getElementById('search-input-mobile');

  const handleSearch = (e) => {
    state.searchQuery = e.target.value;
    renderCatalog();
  };

  if (searchInput) searchInput.addEventListener('input', handleSearch);
  if (searchInputMobile) searchInputMobile.addEventListener('input', handleSearch);

  // Reset filters
  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.searchQuery = '';
      if (searchInput) searchInput.value = '';
      if (searchInputMobile) searchInputMobile.value = '';
      setCategory('all', false);
    });
  }

  // Sort
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });
  }

  // Cart Drawer
  document.getElementById('btn-open-cart').addEventListener('click', openCartDrawer);
  document.getElementById('btn-close-cart').addEventListener('click', closeCartDrawer);
  document.getElementById('cart-drawer-overlay').addEventListener('click', closeCartDrawer);
  document.getElementById('btn-checkout-whatsapp').addEventListener('click', handleCartWhatsAppCheckout);

  // Product modal
  document.getElementById('btn-close-product-modal').addEventListener('click', () => {
    document.getElementById('product-detail-modal').close();
  });

  document.getElementById('modal-btn-add-to-bag').addEventListener('click', () => {
    if (state.selectedProduct) {
      addToCart(state.selectedProduct.id);
      document.getElementById('product-detail-modal').close();
    }
  });

  document.getElementById('modal-btn-direct-whatsapp').addEventListener('click', () => {
    if (state.selectedProduct) {
      handleSingleItemWhatsApp(state.selectedProduct.id);
      document.getElementById('product-detail-modal').close();
    }
  });

  // Guide modal
  const guideModal = document.getElementById('guide-modal');
  const openGuide = () => guideModal.showModal();
  document.getElementById('btn-open-guide').addEventListener('click', openGuide);
  const sidebarGuide = document.getElementById('sidebar-link-guide');
  if (sidebarGuide) {
    sidebarGuide.addEventListener('click', () => {
      closeSidebar();
      openGuide();
    });
  }
  document.querySelectorAll('.btn-show-care, .btn-show-shipping, .btn-show-upi').forEach(b => {
    b.addEventListener('click', () => {
      closeSidebar();
      openGuide();
    });
  });
  document.getElementById('btn-close-guide-modal').addEventListener('click', () => guideModal.close());
  document.getElementById('btn-close-guide-action').addEventListener('click', () => guideModal.close());

  // Custom commission prompt
  const openCustomCommissionWhatsApp = () => {
    const phone = state.settings.whatsapp || (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.DEFAULT_WHATSAPP : '918197477497');
    const message = 
`🌸 *Cute Little Crochet - Custom Commission Request* 🌸
-----------------------------------------
Hi! I saw your crochet portfolio and would love to request a custom creation.

✨ *Idea / Reference:* (e.g. Daisy Cardigan in Lilac / Custom Pet Plushie)
🎨 *Color Palette:* 
📍 *Delivery Pincode:* 

Please let me know if you can make this and the estimated timeline!`;

    const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  document.getElementById('btn-hero-custom').addEventListener('click', openCustomCommissionWhatsApp);
  document.getElementById('btn-custom-commission').addEventListener('click', openCustomCommissionWhatsApp);
  document.querySelectorAll('.btn-show-custom').forEach(b => b.addEventListener('click', openCustomCommissionWhatsApp));
  const sidebarCustom = document.getElementById('sidebar-link-custom');
  if (sidebarCustom) {
    sidebarCustom.addEventListener('click', () => {
      closeSidebar();
      openCustomCommissionWhatsApp();
    });
  }

  // Sidebar direct WhatsApp contact button
  const sidebarWhatsApp = document.getElementById('sidebar-btn-whatsapp');
  if (sidebarWhatsApp) {
    sidebarWhatsApp.addEventListener('click', () => {
      const phone = state.settings.whatsapp || (typeof APP_CONFIG !== 'undefined' ? APP_CONFIG.DEFAULT_WHATSAPP : '918197477497');
      const message = 
`🌸 *Cute Little Crochet - Storefront Inquiry* 🌸
-----------------------------------------
Hi! I'm visiting cutelittlecrochet.netlify.app and would like to ask a question!`;
      const url = `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
    });
  }

  // Secret URL Parameter trigger: ?admin=true
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true') {
    const adminModal = document.getElementById('admin-modal');
    if (adminModal) {
      setTimeout(() => {
        adminModal.showModal();
      }, 150);
    }
  }

  // Secret triple-tap on 🌸 logo in header to open admin portal
  let logoClickCount = 0;
  let logoClickTimer = null;
  const brandLogos = document.querySelectorAll('header a[href="#"] > div:first-child');
  brandLogos.forEach(logo => {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      logoClickCount++;
      clearTimeout(logoClickTimer);
      if (logoClickCount >= 3) {
        logoClickCount = 0;
        const adminModal = document.getElementById('admin-modal');
        if (adminModal) adminModal.showModal();
      } else {
        logoClickTimer = setTimeout(() => {
          logoClickCount = 0;
        }, 600);
      }
    });
  });

  // Escape key closes open drawers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSidebar();
      closeCartDrawer();
    }
  });

  lucide.createIcons();
});
