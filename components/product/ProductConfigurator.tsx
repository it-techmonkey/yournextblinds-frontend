'use client';

import { useState, useMemo } from 'react';
import { Product, ProductConfiguration, defaultConfiguration, Room, MountOption } from '@/types/product';
import {
  ProductGallery,
  ProductHeader,
  ProductDescription,
  ProductPricing,
  ProductReviews,
  StickyBottomBar,
  SizeSelector,
  RoomSelector,
  MountSelector,
  HeadrailSelector,
  OpenStyleSelector,
  WandPositionSelector,
  ValanceSelector,
  DropdownSelector,
  ControlSelector,
  ColourSelector,
  RollerStyleSelector,
  FabricTypeSelector,
  BottomBarSelector,
  LiftSelector,
} from '@/components/product';

interface ProductConfiguratorProps {
  product: Product;
  rooms: Room[];
  mountOptions: MountOption[];
}

const ProductConfigurator = ({ product, rooms, mountOptions }: ProductConfiguratorProps) => {
  const [config, setConfig] = useState<ProductConfiguration>({
    ...defaultConfiguration,
    // Set defaults based on product options
    headrail: product.customization.headrailOptions?.[0]?.id || null,
    openStyle: product.customization.openStyleOptions?.[0]?.id || null,
    wandPosition: product.customization.wandPositionOptions?.[0]?.id || null,
    valance: product.customization.valanceOptions?.[0]?.id || null,
    control: product.customization.controlOptions?.[0]?.id || null,
    controlPosition: product.customization.controlPositionOptions?.[0]?.id || null,
    colour: product.customization.colourOptions?.[0]?.id || null,
    rollerStyle: product.customization.rollerStyleOptions?.[0]?.id || null,
    fabricType: product.customization.fabricTypeOptions?.[0]?.id || null,
    bottomBar: product.customization.bottomBarOptions?.[0]?.id || null,
    lift: product.customization.liftOptions?.[0]?.id || null,
    liftPosition: product.customization.liftPositionOptions?.[0]?.id || null,
  });

  // Calculate additional cost based on selected options
  const additionalCost = useMemo(() => {
    let cost = 0;
    const { customization } = product;

    if (config.headrail && customization.headrailOptions) {
      const option = customization.headrailOptions.find(o => o.id === config.headrail);
      cost += option?.price || 0;
    }
    if (config.openStyle && customization.openStyleOptions) {
      const option = customization.openStyleOptions.find(o => o.id === config.openStyle);
      cost += option?.price || 0;
    }
    if (config.valance && customization.valanceOptions) {
      const option = customization.valanceOptions.find(o => o.id === config.valance);
      cost += option?.price || 0;
    }
    if (config.control && customization.controlOptions) {
      const option = customization.controlOptions.find(o => o.id === config.control);
      cost += option?.price || 0;
    }
    if (config.rollerStyle && customization.rollerStyleOptions) {
      const option = customization.rollerStyleOptions.find(o => o.id === config.rollerStyle);
      cost += option?.price || 0;
    }
    if (config.fabricType && customization.fabricTypeOptions) {
      const option = customization.fabricTypeOptions.find(o => o.id === config.fabricType);
      cost += option?.price || 0;
    }
    if (config.bottomBar && customization.bottomBarOptions) {
      const option = customization.bottomBarOptions.find(o => o.id === config.bottomBar);
      cost += option?.price || 0;
    }
    if (config.lift && customization.liftOptions) {
      const option = customization.liftOptions.find(o => o.id === config.lift);
      cost += option?.price || 0;
    }

    return cost;
  }, [config, product.customization]);

  const handleBuyClick = () => {
    // Handle buy action
    console.log('Buy clicked with config:', config);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
      {/* Left Column - Gallery */}
      <div className="w-full lg:w-[45%] lg:sticky lg:top-32 lg:self-start">
        <ProductGallery images={product.images} productName={product.name} />
      </div>

      {/* Right Column - Configuration */}
      <div className="w-full lg:w-[55%] flex flex-col gap-8">
        <ProductHeader
          name={product.name}
          category={product.category}
          rating={product.rating}
          reviewCount={product.reviewCount}
          estimatedDelivery={product.estimatedDelivery}
        />

        {/* Configuration Title */}
        <div className="bg-[#00473c] text-white px-4 py-3 rounded">
          <h2 className="text-lg font-medium">Configure Your Window Treatment</h2>
        </div>

        {/* Size Selector */}
        {product.features.hasSize && (
          <SizeSelector
            width={config.width}
            widthFraction={config.widthFraction}
            height={config.height}
            heightFraction={config.heightFraction}
            onWidthChange={(value) => setConfig({ ...config, width: value })}
            onWidthFractionChange={(value) => setConfig({ ...config, widthFraction: value })}
            onHeightChange={(value) => setConfig({ ...config, height: value })}
            onHeightFractionChange={(value) => setConfig({ ...config, heightFraction: value })}
          />
        )}

        {/* Room Selector */}
        {product.features.hasRoom && (
          <RoomSelector
            rooms={rooms}
            selectedRoom={config.room}
            onRoomChange={(roomId) => setConfig({ ...config, room: roomId })}
          />
        )}

        {/* Mount Selector */}
        {product.features.hasMount && (
          <MountSelector
            options={mountOptions}
            selectedMount={config.mount}
            onMountChange={(mountId) => setConfig({ ...config, mount: mountId })}
          />
        )}

        {/* Fabric Type Selector */}
        {product.features.hasFabricType && product.customization.fabricTypeOptions && (
          <FabricTypeSelector
            options={product.customization.fabricTypeOptions}
            selectedType={config.fabricType}
            onTypeChange={(typeId) => setConfig({ ...config, fabricType: typeId })}
          />
        )}

        {/* Colour Selector */}
        {product.features.hasColour && product.customization.colourOptions && (
          <ColourSelector
            options={product.customization.colourOptions}
            selectedColour={config.colour}
            onColourChange={(colourId) => setConfig({ ...config, colour: colourId })}
          />
        )}

        {/* Headrail Selector */}
        {product.features.hasHeadrail && product.customization.headrailOptions && (
          <HeadrailSelector
            options={product.customization.headrailOptions}
            selectedHeadrail={config.headrail}
            onHeadrailChange={(headrailId) => setConfig({ ...config, headrail: headrailId })}
          />
        )}

        {/* Open Style Selector */}
        {product.features.hasOpenStyle && product.customization.openStyleOptions && (
          <>
            <OpenStyleSelector
              options={product.customization.openStyleOptions}
              selectedStyle={config.openStyle}
              onStyleChange={(styleId) => setConfig({ ...config, openStyle: styleId })}
            />
            {/* Wand Position */}
            {product.features.hasWandPosition && product.customization.wandPositionOptions && config.openStyle === 'wand' && (
              <WandPositionSelector
                options={product.customization.wandPositionOptions}
                selectedPosition={config.wandPosition}
                onPositionChange={(positionId) => setConfig({ ...config, wandPosition: positionId })}
              />
            )}
          </>
        )}

        {/* Control Selector */}
        {product.features.hasControl && product.customization.controlOptions && (
          <ControlSelector
            options={product.customization.controlOptions}
            selectedControl={config.control}
            onControlChange={(controlId) => setConfig({ ...config, control: controlId })}
            positionOptions={product.customization.controlPositionOptions}
            selectedPosition={config.controlPosition}
            onPositionChange={(positionId) => setConfig({ ...config, controlPosition: positionId })}
          />
        )}

        {/* Lift Selector */}
        {product.features.hasLift && product.customization.liftOptions && (
          <LiftSelector
            options={product.customization.liftOptions}
            selectedLift={config.lift}
            onLiftChange={(liftId) => setConfig({ ...config, lift: liftId })}
            positionOptions={product.customization.liftPositionOptions}
            selectedPosition={config.liftPosition}
            onPositionChange={(positionId) => setConfig({ ...config, liftPosition: positionId })}
          />
        )}

        {/* Roller Style Selector */}
        {product.features.hasRollerStyle && product.customization.rollerStyleOptions && (
          <RollerStyleSelector
            options={product.customization.rollerStyleOptions}
            selectedStyle={config.rollerStyle}
            onStyleChange={(styleId) => setConfig({ ...config, rollerStyle: styleId })}
          />
        )}

        {/* Valance Selector */}
        {product.features.hasValance && product.customization.valanceOptions && (
          <ValanceSelector
            options={product.customization.valanceOptions}
            selectedValance={config.valance}
            onValanceChange={(valanceId) => setConfig({ ...config, valance: valanceId })}
          />
        )}

        {/* Bottom Bar Selector */}
        {product.features.hasBottomBar && product.customization.bottomBarOptions && (
          <BottomBarSelector
            options={product.customization.bottomBarOptions}
            selectedBar={config.bottomBar}
            onBarChange={(barId) => setConfig({ ...config, bottomBar: barId })}
          />
        )}

        {/* Dropdown Selectors */}
        {product.features.hasBottomChain && product.customization.bottomChainOptions && (
          <DropdownSelector
            label="Select Bottom Weight Chain"
            options={product.customization.bottomChainOptions}
            selectedValue={config.bottomChain}
            onValueChange={(value) => setConfig({ ...config, bottomChain: value })}
            placeholder="Select Bottom Weight Chain"
          />
        )}

        {product.features.hasBracketType && product.customization.bracketOptions && (
          <DropdownSelector
            label="Bracket Type"
            options={product.customization.bracketOptions}
            selectedValue={config.bracketType}
            onValueChange={(value) => setConfig({ ...config, bracketType: value })}
            placeholder="Select Bracket Type"
          />
        )}

        {/* Desktop Pricing */}
        <div className="hidden lg:block">
          <ProductPricing
            price={product.price}
            originalPrice={product.originalPrice}
            additionalCost={additionalCost}
          />
        </div>

        {/* Product Description */}
        <ProductDescription description={product.description} />

        {/* Reviews */}
        {product.reviews.length > 0 && (
          <ProductReviews
            reviews={product.reviews}
            averageRating={product.rating}
            totalReviews={product.reviewCount}
          />
        )}
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <StickyBottomBar
        price={product.price}
        additionalCost={additionalCost}
        onBuyClick={handleBuyClick}
      />
    </div>
  );
};

export default ProductConfigurator;
